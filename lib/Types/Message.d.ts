import type { Readable } from 'stream';
import type { URL } from 'url';
import { proto } from '../../WAProto/index.js';
import type { MediaType } from '../Defaults/index.js';
import type { BinaryNode } from '../WABinary/index.js';
import type { GroupMetadata } from './GroupMetadata.js';
import type { CacheStore } from './Socket.js';
export { proto as WAProto };
export type WAMessage = proto.IWebMessageInfo & {
    key: WAMessageKey;
    messageStubParameters?: any;
    category?: string;
    retryCount?: number;
};
export type WAMessageContent = proto.IMessage;
export type WAContactMessage = proto.Message.IContactMessage;
export type WAContactsArrayMessage = proto.Message.IContactsArrayMessage;
export type WAMessageKey = proto.IMessageKey & {
    remoteJidAlt?: string;
    participantAlt?: string;
    server_id?: string;
    addressingMode?: string;
    isViewOnce?: boolean;
};
export type WATextMessage = proto.Message.IExtendedTextMessage;
export type WAContextInfo = proto.IContextInfo;
export type WALocationMessage = proto.Message.ILocationMessage;
export type WAGenericMediaMessage = proto.Message.IVideoMessage | proto.Message.IImageMessage | proto.Message.IAudioMessage | proto.Message.IDocumentMessage | proto.Message.IStickerMessage | proto.Message.IVideoMessage;
export declare const WAMessageStubType: typeof proto.WebMessageInfo.StubType;
export declare const WAMessageStatus: typeof proto.WebMessageInfo.Status;
import type { ILogger } from '../Utils/logger.js';
export type WAMediaPayloadURL = {
    url: URL | string;
};
export type WAMediaPayloadStream = {
    stream: Readable;
};
export type WAMediaUpload = Buffer | WAMediaPayloadStream | WAMediaPayloadURL;
/** Set of message types that are supported by the library */
export type MessageType = keyof proto.Message;
export declare enum WAMessageAddressingMode {
    PN = "pn",
    LID = "lid"
}
export type MessageWithContextInfo = 'imageMessage' | 'contactMessage' | 'locationMessage' | 'extendedTextMessage' | 'documentMessage' | 'audioMessage' | 'videoMessage' | 'call' | 'contactsArrayMessage' | 'liveLocationMessage' | 'templateMessage' | 'stickerMessage' | 'groupInviteMessage' | 'templateButtonReplyMessage' | 'productMessage' | 'listMessage' | 'orderMessage' | 'listResponseMessage' | 'buttonsMessage' | 'buttonsResponseMessage' | 'interactiveMessage' | 'interactiveResponseMessage' | 'pollCreationMessage' | 'requestPhoneNumberMessage' | 'messageHistoryBundle' | 'eventMessage' | 'newsletterAdminInviteMessage' | 'albumMessage' | 'stickerPackMessage' | 'pollResultSnapshotMessage' | 'messageHistoryNotice';
export type DownloadableMessage = {
    mediaKey?: Uint8Array | null;
    directPath?: string | null;
    url?: string | null;
};
export type MessageReceiptType = 'read' | 'read-self' | 'hist_sync' | 'peer_msg' | 'sender' | 'inactive' | 'played' | undefined;
export type MediaConnInfo = {
    auth: string;
    ttl: number;
    hosts: {
        hostname: string;
        maxContentLengthBytes: number;
    }[];
    fetchDate: Date;
};
export interface WAUrlInfo {
    'canonical-url': string;
    'matched-text': string;
    title: string;
    description?: string;
    jpegThumbnail?: Buffer;
    highQualityThumbnail?: proto.Message.IImageMessage;
    originalThumbnailUrl?: string;
}
type Mentionable = {
    /** list of jids that are mentioned in the accompanying text */
    mentions?: string[];
};
type Contextable = {
    /** add contextInfo to the message */
    contextInfo?: proto.IContextInfo;
};

type Listable = {
    /** Sections of the List */
    sections?: proto.Message.ListMessage.ISection[];
    /** Title of a List Message only */
    title?: string;
    /** Text of the button on the list (required) */
    buttonText?: string;
    /** ListType of a List Message only */
    listType?: proto.Message.ListMessage.ListType;
    /** Description of the list */
    text?: string;
    /** Footer text */
    footer?: string;
};

type ProductListable = {
    /** Product list sections */
    productList?: proto.Message.ListMessage.IProductSection[];
    /** Thumbnail for product list */
    thumbnail?: WAMediaUpload;
    /** Business owner JID */
    businessOwnerJid?: string;
    /** Title of product list */
    title?: string;
    /** Button text */
    buttonText?: string;
    /** Footer text */
    footer?: string;
    /** Description */
    text?: string;
};

type Buttonable = {
    /** add buttons to the message */
    buttons?: proto.Message.ButtonsMessage.IButton[];
    /** Title for button message */
    title?: string;
    /** Footer text */
    footer?: string;
};

type Templatable = {
    /** add template buttons to the message */
    templateButtons?: proto.IHydratedTemplateButton[];
    /** Footer text */
    footer?: string;
};

type Interactiveable = {
    /** add interactive buttons to the message */
    interactiveButtons?: proto.Message.InteractiveMessage.NativeFlowMessage.INativeFlowButton[];
    /** Title */
    title?: string;
    /** Subtitle */
    subtitle?: string;
    /** Footer text */
    footer?: string;
    /** Has media attachment */
    media?: boolean;
};
type ViewOnce = {
    viewOnce?: boolean;
};
type Editable = {
    edit?: WAMessageKey;
};
type WithDimensions = {
    width?: number;
    height?: number;
};
export type PollMessageOptions = {
    name: string;
    selectableCount?: number;
    values: string[];
    /** 32 byte message secret to encrypt poll selections */
    messageSecret?: Uint8Array;
    toAnnouncementGroup?: boolean;
};
export type EventMessageOptions = {
    name: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    location?: WALocationMessage;
    call?: 'audio' | 'video';
    isCancelled?: boolean;
    isScheduleCall?: boolean;
    extraGuestsAllowed?: boolean;
    messageSecret?: Uint8Array<ArrayBufferLike>;
};

export type PollResultOptions = {
    name: string;
    values: [string, number][]; // [optionName, voteCount][]
};

export type AlbumMessage = {
    image?: WAMediaUpload;
    video?: WAMediaUpload;
    caption?: string;
}[];

export type Sticker = {
    data: WAMediaUpload;
    emojis?: string[];
    accessibilityLabel?: string;
    isAnimated?: boolean;
    isLottie?: boolean;
};

export type StickerPack = {
    stickers: Sticker[];
    cover: WAMediaUpload;
    name: string;
    publisher: string;
    description?: string;
    packId?: string;
};

export type AdminInviteInfo = {
    jid: string;
    name: string;
    caption: string;
    expiration: number;
    jpegThumbnail?: string;
};

export type PaymentInfo = {
    note: string;
    currency?: string;
    offset?: number;
    amount?: number;
    expiry?: number;
    from?: string;
    image?: {
        placeholderArgb: number;
        textArgb: number;
        subtextArgb: number;
    };
};

export type PaymentInviteInfo = {
    type: number;
    expiry: number;
};

export type WASendableProduct = Omit<proto.Message.ProductMessage.IProductSnapshot, 'productImage'> & {
    productImage: WAMediaUpload;
};

export type OrderMessage = proto.Message.IOrderMessage;

export type Carousel = {
    image?: WAMediaUpload;
    video?: WAMediaUpload;
    product?: WASendableProduct;
    title?: string;
    body?: string;
    footer?: string;
    buttons?: proto.Message.InteractiveMessage.NativeFlowMessage.INativeFlowButton[];
};

export type ShopSurface = 'FB' | 'IG' | 'WA' | 'WA_WEB';

export type ShopInfo = {
    surface: ShopSurface;
    id: string;
};

export type CollectionInfo = {
    bizJid: string;
    id: string;
    version?: number;
};

type SharePhoneNumber = {
    sharePhoneNumber: boolean;
};
type RequestPhoneNumber = {
    requestPhoneNumber: boolean;
};
export type AnyMediaMessageContent = (({
    image: WAMediaUpload;
    caption?: string;
    jpegThumbnail?: string;
} & Mentionable & Contextable & Buttonable & Templatable & Interactiveable & WithDimensions) | ({
    video: WAMediaUpload;
    caption?: string;
    gifPlayback?: boolean;
    jpegThumbnail?: string;
    /** if set to true, will send as a `video note` */
    ptv?: boolean;
} & Mentionable & Contextable & Buttonable & Templatable & Interactiveable & WithDimensions) | {
    audio: WAMediaUpload;
    /** if set to true, will send as a `voice note` */
    ptt?: boolean;
    /** optionally tell the duration of the audio */
    seconds?: number;
} | ({
    sticker: WAMediaUpload;
    isAnimated?: boolean;
} & WithDimensions) | ({
    document: WAMediaUpload;
    mimetype: string;
    fileName?: string;
    caption?: string;
} & Contextable & Buttonable & Templatable & Interactiveable)) & {
    mimetype?: string;
} & Editable;
export type ButtonReplyInfo = {
    displayText?: string;
    id?: string;
    index?: number;
    title?: string;
    description?: string;
    rowId?: string;
    nativeFlows?: {
        name?: string;
        paramsJson?: string;
        version?: number;
    };
};
export type GroupInviteInfo = {
    inviteCode: string;
    inviteExpiration: number;
    text: string;
    jid: string;
    subject: string;
};
export type WASendableProduct = Omit<proto.Message.ProductMessage.IProductSnapshot, 'productImage'> & {
    productImage: WAMediaUpload;
};
export type AnyRegularMessageContent = (({
    text: string;
    linkPreview?: WAUrlInfo | null;
} & Mentionable & Contextable & Buttonable & Templatable & Interactiveable & Listable & ProductListable & Editable) | AnyMediaMessageContent | {
    event: EventMessageOptions;
} | ({
    poll: PollMessageOptions;
} & Mentionable & Contextable & Buttonable & Templatable & Interactiveable & Listable & ProductListable & Editable) | {
    pollResult: PollResultOptions;
} | {
    album: AlbumMessage;
} | {
    stickerPack: StickerPack;
} | {
    order: OrderMessage;
} | {
    payment: PaymentInfo;
} | {
    paymentInvite: PaymentInviteInfo;
} | {
    adminInvite: AdminInviteInfo;
} | {
    shop: ShopInfo;
    title?: string;
    subtitle?: string;
    footer?: string;
    text?: string;
    caption?: string;
    media?: boolean;
} | {
    collection: CollectionInfo;
    title?: string;
    subtitle?: string;
    footer?: string;
    text?: string;
    caption?: string;
    hasMediaAttachment?: boolean;
} | {
    cards: Carousel[];
    title?: string;
    subtitle?: string;
    footer?: string;
    text?: string;
} | {
    contacts: {
        displayName?: string;
        contacts: proto.Message.IContactMessage[];
    };
} | {
    location: WALocationMessage;
} | {
    react: proto.Message.IReactionMessage;
} | {
    buttonReply: ButtonReplyInfo;
    type: 'template' | 'plain' | 'list' | 'interactive';
} | {
    groupInvite: GroupInviteInfo;
} | {
    listReply: Omit<proto.Message.IListResponseMessage, 'contextInfo'>;
} | {
    pin: WAMessageKey;
    type: proto.PinInChat.Type;
    /**
     * 24 hours, 7 days, 30 days
     */
    time?: 86400 | 604800 | 2592000;
} | {
    product: WASendableProduct;
    businessOwnerJid?: string;
    body?: string;
    footer?: string;
} | SharePhoneNumber | RequestPhoneNumber) & ViewOnce;
export type AnyMessageContent = AnyRegularMessageContent | {
    forward: WAMessage;
    force?: boolean;
} | {
    /** Delete your message or anyone's message in a group (admin required) */
    delete: WAMessageKey;
} | {
    disappearingMessagesInChat: boolean | number;
} | {
    limitSharing: boolean;
};
export type GroupMetadataParticipants = Pick<GroupMetadata, 'participants'>;
type MinimalRelayOptions = {
    /** override the message ID with a custom provided string */
    messageId?: string;
    /** should we use group metadata cache, or fetch afresh from the server; default assumed to be "true" */
    useCachedGroupMetadata?: boolean;
};
export type MessageRelayOptions = MinimalRelayOptions & {
    /** only send to a specific participant; used when a message decryption fails for a single user */
    participant?: {
        jid: string;
        count: number;
    };
    /** additional attributes to add to the WA binary node */
    additionalAttributes?: {
        [_: string]: string;
    };
    additionalNodes?: BinaryNode[];
    /** should we use the devices cache, or fetch afresh from the server; default assumed to be "true" */
    useUserDevicesCache?: boolean;
    /** jid list of participants for status@broadcast */
    statusJidList?: string[];
};
export type MiscMessageGenerationOptions = MinimalRelayOptions & {
    /** optional, if you want to manually set the timestamp of the message */
    timestamp?: Date;
    /** the message you want to quote */
    quoted?: WAMessage;
    /** disappearing messages settings */
    ephemeralExpiration?: number | string;
    /** timeout for media upload to WA server */
    mediaUploadTimeoutMs?: number;
    /** jid list of participants for status@broadcast */
    statusJidList?: string[];
    /** backgroundcolor for status */
    backgroundColor?: string;
    /** font type for status */
    font?: number;
    /** if it is broadcast */
    broadcast?: boolean;
};
export type MessageGenerationOptionsFromContent = MiscMessageGenerationOptions & {
    userJid: string;
};
export type WAMediaUploadFunction = (encFilePath: string, opts: {
    fileEncSha256B64: string;
    mediaType: MediaType;
    timeoutMs?: number;
}) => Promise<{
    mediaUrl: string;
    directPath: string;
    meta_hmac?: string;
    ts?: number;
    fbid?: number;
}>;
export type MediaGenerationOptions = {
    logger?: ILogger;
    mediaTypeOverride?: MediaType;
    upload: WAMediaUploadFunction;
    /** cache media so it does not have to be uploaded again */
    mediaCache?: CacheStore;
    mediaUploadTimeoutMs?: number;
    options?: RequestInit;
    backgroundColor?: string;
    font?: number;
};
export type MessageContentGenerationOptions = MediaGenerationOptions & {
    getUrlInfo?: (text: string) => Promise<WAUrlInfo | undefined>;
    getProfilePicUrl?: (jid: string, type: 'image' | 'preview') => Promise<string | undefined>;
    getCallLink?: (type: 'audio' | 'video', event?: {
        startTime: number;
    }) => Promise<string | undefined>;
    jid?: string;
};
export type MessageGenerationOptions = MessageContentGenerationOptions & MessageGenerationOptionsFromContent;
/**
 * Type of message upsert
 * 1. notify => notify the user, this message was just received
 * 2. append => append the message to the chat history, no notification required
 */
export type MessageUpsertType = 'append' | 'notify';
export type MessageUserReceipt = proto.IUserReceipt;
export type WAMessageUpdate = {
    update: Partial<WAMessage>;
    key: WAMessageKey;
};
export type WAMessageCursor = {
    before: WAMessageKey | undefined;
} | {
    after: WAMessageKey | undefined;
};
export type MessageUserReceiptUpdate = {
    key: WAMessageKey;
    receipt: MessageUserReceipt;
};
export type MediaDecryptionKeyInfo = {
    iv: Uint8Array;
    cipherKey: Uint8Array;
    macKey?: Uint8Array;
};
export type MinimalMessage = Pick<WAMessage, 'key' | 'messageTimestamp'>;
//# sourceMappingURL=Message.d.ts.map