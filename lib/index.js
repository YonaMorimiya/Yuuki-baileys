import chalk from 'chalk';

// Yuuki Bailesy idk

const _yuuki = {
    line : chalk.hex('#00BFFF')('━'.repeat(60)),
    title: chalk.bold.hex('#00BFFF')('💧  Yuukii Baileys  ') + chalk.hex('#0080FF')('| Modified Edition'),
    pair : chalk.hex('#0080FF')('⌘  Pairing Code : ') + chalk.bold.white('LIMMZTAA'),
    repo : chalk.hex('#0080FF')('❖  GitHub : ') + chalk.bold.cyan('@YonaMorimiya'),
    note : chalk.dim.hex('#00BFFF')('   WhatsApp Multi-Device Library'),
};
console.log(_yuuki.line);
console.log(_yuuki.title);
console.log(_yuuki.pair);
console.log(_yuuki.repo);
console.log(_yuuki.note);
console.log(_yuuki.line);
// ─────────────────────────────────────────────────────────────────────────────

import makeWASocket from './Socket/index.js';
export * from '../WAProto/index.js';
export { proto } from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Defaults/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';
export * from './Store/index.js';
export { makeWASocket };
export default makeWASocket;
//# sourceMappingURL=index.js.map
