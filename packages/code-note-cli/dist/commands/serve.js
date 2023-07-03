"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const server_1 = require("@codenote/server");
const isProduction = process.env.NODE_ENV === "production";
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action((filename = "codeNote.js", options) => __awaiter(void 0, void 0, void 0, function* () {
    // handle error handling if some error occurred for an instance a port is already in use
    try {
        //calculating the file path
        // join current working directory file path and the directory path
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        //path.basename(filename) : extract only the file name
        yield (0, server_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir, !isProduction);
        console.log(`Opened ${filename}. Navigation to http://localhost:${options.port} to edit the the file.`);
    }
    catch (err) {
        if (err.code === "EADDRINUSE") {
            console.log("Port is in use. Try running on a different port");
        }
        else {
            console.log("Error log : ", err.message);
        }
        process.exit(1);
    }
}));
