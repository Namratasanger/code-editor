import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellsRouter } from "./routes/cells";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();
  console.log(useProxy);

  // wire up express router
  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    // when doing active development on local machine wireup the proxy middle
    app.use(
      createProxyMiddleware({
        target: "http://localhost:3000",
        ws: true, // enable web socket support
        logLevel: "silent",
      })
    );
  } else {
    // when a user's have installed our codenote cli and running the application on their system
    // require.resolve will apply the nodes path resolution algorithm to figure out the file location of the index.html file
    const packagePath = require.resolve("@codenote/ui/build/index.html");

    // server the build folder then
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
