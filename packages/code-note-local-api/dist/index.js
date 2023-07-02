"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = __importDefault(require("path"));
const cells_1 = require("./routes/cells");
const serve = (port, filename, dir, useProxy) => {
    const app = (0, express_1.default)();
    console.log(useProxy);
    // wire up express router
    app.use((0, cells_1.createCellsRouter)(filename, dir));
    if (useProxy) {
        // when doing active development on local machine wireup the proxy middle
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: "http://localhost:3000",
            ws: true,
            logLevel: "silent",
        }));
    }
    else {
        // when a user's have installed our codenote cli and running the application on their system
        // require.resolve will apply the nodes path resolution algorithm to figure out the file location of the index.html file
        const packagePath = require.resolve("code-note-local-client/build/index.html");
        // server the build folder then
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
exports.serve = serve;
