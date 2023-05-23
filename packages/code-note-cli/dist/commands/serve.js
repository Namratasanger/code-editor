"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const code_note_local_api_1 = require("code-note-local-api");
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action((filename = "codeNote.js", options) => {
    //calculating the file path
    // join current working directory file path and the directory path
    const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    //path.basename(filename) : extract only the file name
    (0, code_note_local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir);
});
