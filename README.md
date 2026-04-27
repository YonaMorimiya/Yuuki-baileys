<p align="center">
  <img src="https://img.shields.io/badge/Node.js-≥20-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/module-ESM%20%2B%20CJS-blue" />
  <img src="https://img.shields.io/badge/license-MIT-green" />
  <img src="https://img.shields.io/badge/WhatsApp-Multi--Device-25D366?logo=whatsapp&logoColor=white" />
</p>

# Yuuki-baileys

**Modified WhatsApp Multi-Device library** — fork dari Baileys dengan dukungan penuh untuk **button messages**, **LID mapping**, **custom pairing code**, dan dual module **ESM + CJS**.

---

## ✨ Fitur Utama

| Fitur | Keterangan |
|---|---|
| **Button Messages** | Mendukung Buttons, Template Buttons, Interactive (Native Flow) Buttons, List Messages, dan Carousel Cards |
| **Dual Module (ESM + CJS)** | Bisa di-import via `import` (ESM) maupun `require()` (CJS) tanpa konfigurasi tambahan |
| **Custom Pairing Code** | Autentikasi headless tanpa scan QR — gunakan 8-karakter pairing code |
| **LID Mapping** | Resolve LID (`@lid`) ke JID asli (`@s.whatsapp.net`) via `resolveJid()` / `resolveJids()` |
| **Group & Channel** | Dukungan penuh untuk group, community, dan newsletter/channel messages |

---

## 📦 Instalasi

```bash
npm install github:YonaMorimiya/Yuuki-baileys
# atau
yarn add github:YonaMorimiya/Yuuki-baileys
```

> **Requirement:** Node.js ≥ 20

---

## 🔌 ESM & CJS Support

Library ini mendukung kedua module system secara native:

### ESM (ECMAScript Modules)

```js
import makeWASocket, {
  useMultiFileAuthState,
  Browsers,
  DisconnectReason
} from '@yuuki/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./auth')
const conn = makeWASocket({
  auth: state,
  browser: Browsers.ubuntu('Chrome')
})
```

### CJS (CommonJS)

```js
const {
  makeWASocket,
  useMultiFileAuthState,
  Browsers,
  DisconnectReason
} = require('@yuuki/baileys')

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth')
  const conn = makeWASocket({
    auth: state,
    browser: Browsers.ubuntu('Chrome')
  })
}
start()
```

> **Catatan CJS:** Semua fungsi otomatis await internal ESM load — tidak perlu `await ready`. Cukup panggil `useMultiFileAuthState()` lebih dulu sebelum `makeWASocket()`.

---

## 🔑 Custom Pairing Code

Autentikasi tanpa QR scan — cocok untuk server/headless environment:

```js
import makeWASocket, { useMultiFileAuthState } from '@yuuki/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./auth')
const conn = makeWASocket({
  auth: state,
  printQRInTerminal: false
})

conn.ev.on('connection.update', async (update) => {
  if (update.qr) {
    // Request pairing code (default: 8-char code)
    const code = await conn.requestPairingCode('628xxxxxxxxxx')
    console.log('Pairing Code:', code)
  }
})

// Custom 8-karakter code:
const code = await conn.requestPairingCode('628xxxxxxxxxx', 'MYCODE88')
```

---

## 🆔 LID Mapping & Resolve

WhatsApp Multi-Device menggunakan LID (Linked Identity) format (`@lid`) untuk participant di grup. Yuuki-baileys menyediakan utility untuk resolve ke JID asli:

```js
import { resolveJid, resolveJids } from '@yuuki/baileys'

// Resolve sender/quoted/mention ke JID @s.whatsapp.net
const jid = await resolveJid(conn, m)

// Resolve dari mention
const jid = await resolveJid(conn, m, m.mentionedJid?.[0])

// Resolve banyak JID sekaligus
const jids = await resolveJids(conn, m, m.mentionedJid)
```

**Event LID Mapping:**

```js
conn.ev.on('lid-mapping.update', (mapping) => {
  console.log('LID → JID mapping updated:', mapping)
})
```

---

## 🔘 Button Support

Yuuki-baileys mendukung berbagai jenis button message:

### 1. Buttons Message (Quick Reply)

```js
await conn.sendMessage(jid, {
  text: 'Pilih menu:',
  footer: 'Powered by Yuuki',
  buttons: [
    { buttonId: 'id1', buttonText: { displayText: 'Menu 1' } },
    { buttonId: 'id2', buttonText: { displayText: 'Menu 2' } },
    { buttonId: 'id3', buttonText: { displayText: 'Menu 3' } }
  ]
})
```

### 2. Buttons + Media (Image/Video/Document)

```js
await conn.sendMessage(jid, {
  image: { url: './gambar.jpg' },
  caption: 'Lihat gambar ini!',
  footer: 'Powered by Yuuki',
  buttons: [
    { buttonId: 'like', buttonText: { displayText: '👍 Like' } },
    { buttonId: 'info', buttonText: { displayText: 'ℹ️ Info' } }
  ]
})
```

### 3. Template Buttons (URL, Call, Quick Reply)

```js
await conn.sendMessage(jid, {
  text: 'Template Button Demo',
  footer: 'Powered by Yuuki',
  templateButtons: [
    {
      index: 1,
      urlButton: {
        displayText: '🌐 Visit Website',
        url: 'https://github.com/YonaMorimiya/Yuuki-baileys'
      }
    },
    {
      index: 2,
      callButton: {
        displayText: '📞 Call Us',
        phoneNumber: '+628xxxxxxxxxx'
      }
    },
    {
      index: 3,
      quickReplyButton: {
        displayText: '💬 Quick Reply',
        id: 'qr-1'
      }
    }
  ]
})
```

### 4. Interactive Buttons (Native Flow)

```js
await conn.sendMessage(jid, {
  text: 'Interactive Button Demo',
  title: 'Judul Pesan',
  footer: 'Powered by Yuuki',
  interactiveButtons: [
    {
      name: 'quick_reply',
      buttonParamsJson: JSON.stringify({
        display_text: 'Button 1',
        id: 'btn-1'
      })
    },
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: 'Open Link',
        url: 'https://github.com/YonaMorimiya'
      })
    },
    {
      name: 'cta_copy',
      buttonParamsJson: JSON.stringify({
        display_text: 'Copy Code',
        copy_code: 'YUUKI2025'
      })
    }
  ]
})
```

### 5. List Message

```js
await conn.sendMessage(jid, {
  text: 'Daftar menu tersedia',
  title: 'Menu Utama',
  buttonText: 'Lihat Menu',
  footer: 'Powered by Yuuki',
  sections: [
    {
      title: 'Kategori 1',
      rows: [
        { title: 'Option A', rowId: 'a', description: 'Deskripsi A' },
        { title: 'Option B', rowId: 'b', description: 'Deskripsi B' }
      ]
    },
    {
      title: 'Kategori 2',
      rows: [
        { title: 'Option C', rowId: 'c', description: 'Deskripsi C' }
      ]
    }
  ]
})
```

### 6. Carousel Cards

```js
await conn.sendMessage(jid, {
  text: 'Carousel Demo',
  footer: 'Swipe untuk lihat semua',
  cards: [
    {
      image: { url: './slide1.jpg' },
      title: 'Slide 1',
      body: 'Deskripsi slide pertama',
      footer: 'Footer slide 1',
      buttons: [
        {
          name: 'quick_reply',
          buttonParamsJson: JSON.stringify({
            display_text: 'Pilih Slide 1',
            id: 'slide-1'
          })
        }
      ]
    },
    {
      image: { url: './slide2.jpg' },
      title: 'Slide 2',
      body: 'Deskripsi slide kedua',
      footer: 'Footer slide 2',
      buttons: [
        {
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: 'Buka Link',
            url: 'https://example.com'
          })
        }
      ]
    }
  ]
})
```

### 7. Button Reply Handler

```js
conn.ev.on('messages.upsert', async ({ messages }) => {
  const m = messages[0]
  if (!m.message) return

  // Buttons Response
  const buttonsResponse = m.message.buttonsResponseMessage
  if (buttonsResponse) {
    console.log('Button clicked:', buttonsResponse.selectedButtonId)
  }

  // Template Button Response
  const templateResponse = m.message.templateButtonReplyMessage
  if (templateResponse) {
    console.log('Template button:', templateResponse.selectedId)
  }

  // List Response
  const listResponse = m.message.listResponseMessage
  if (listResponse) {
    console.log('List selected:', listResponse.singleSelectReply?.selectedRowId)
  }

  // Interactive (Native Flow) Response
  const interactiveResponse = m.message.interactiveResponseMessage
  if (interactiveResponse) {
    const body = interactiveResponse.nativeFlowResponseMessage
    console.log('Interactive response:', JSON.parse(body?.paramsJson || '{}'))
  }
})
```

---

## 📊 Tipe Button yang Didukung

| Tipe | Key di `sendMessage` | Deskripsi |
|---|---|---|
| **Buttons** | `buttons` | Quick reply buttons (max 3) |
| **Template Buttons** | `templateButtons` | URL, Call, Quick Reply buttons |
| **Interactive Buttons** | `interactiveButtons` | Native Flow — `quick_reply`, `cta_url`, `cta_copy`, dll |
| **List Message** | `sections` + `buttonText` | Menu list dengan kategori & rows |
| **Carousel** | `cards` | Swipeable cards dengan image/video + buttons |

### Header Types (Buttons Message)

| Header | Cara Pakai |
|---|---|
| Text only | `{ text: '...', buttons: [...] }` |
| Dengan title | `{ text: '...', title: 'Judul', buttons: [...] }` |
| Image + buttons | `{ image: {...}, caption: '...', buttons: [...] }` |
| Video + buttons | `{ video: {...}, caption: '...', buttons: [...] }` |
| Document + buttons | `{ document: {...}, mimetype: '...', buttons: [...] }` |

---

## 📂 Struktur Project

```
Yuuki-baileys/
├── index.cjs             # CJS wrapper (auto-await ESM)
├── index.d.ts            # TypeScript declarations (root)
├── engine-requirements.js # Node.js version check (≥20)
├── package.json          # Dual exports: ESM + CJS
├── WAProto/              # Protobuf definitions & generated code
│   ├── WAProto.proto
│   └── index.js / index.d.ts
└── lib/
    ├── index.js          # ESM entry point
    ├── Socket/           # WebSocket & message handling
    │   ├── socket.js     # Core socket + pairing code
    │   ├── messages-send.js
    │   ├── messages-recv.js
    │   ├── groups.js
    │   ├── communities.js
    │   ├── newsletter.js
    │   └── Client/       # Client-level socket
    ├── Utils/
    │   ├── messages.js   # Message building (buttons, lists, etc.)
    │   ├── auth-utils.js
    │   ├── resolve-jid.js # LID → JID resolver
    │   ├── crypto.js
    │   └── ...
    ├── Types/            # TypeScript type definitions
    ├── Defaults/         # Default configs & constants
    ├── WABinary/         # Binary protocol encoding
    ├── WAM/              # WhatsApp Metrics
    ├── WAUSync/          # USync protocol (LID, device sync)
    └── Store/            # In-memory store
```

---

## ⚙️ Exports Map

```jsonc
// package.json exports
{
  ".": {
    "import": "./lib/index.js",    // ESM
    "require": "./index.cjs",      // CJS
    "default": "./lib/index.js"
  }
}
```

| Module System | Entry Point | Cara Pakai |
|---|---|---|
| **ESM** | `lib/index.js` | `import makeWASocket from '@yuuki/baileys'` |
| **CJS** | `index.cjs` | `const { makeWASocket } = require('@yuuki/baileys')` |

---

## 🔗 Event Listeners

```js
// Connection state
conn.ev.on('connection.update', (update) => {
  const { connection, lastDisconnect, qr } = update
  if (connection === 'close') {
    // Handle reconnect
  }
  if (connection === 'open') {
    console.log('Connected!')
  }
})

// Save credentials
conn.ev.on('creds.update', saveCreds)

// Incoming messages
conn.ev.on('messages.upsert', async ({ messages, type }) => {
  if (type !== 'notify') return
  const m = messages[0]
  console.log('New message:', m.message)
})

// LID mapping updates
conn.ev.on('lid-mapping.update', (data) => {
  console.log('LID mapping:', data)
})
```

---

## 📄 Lisensi

[MIT License](./LICENSE) — Copyright (c) 2025 ryuhan

---

<p align="center">
  <b>Made with 💧 by <a href="https://github.com/YonaMorimiya">YonaMorimiya</a></b>
</p>
