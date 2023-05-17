import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let waiting: Promise<void>;
export const setupBundle = () => {
  waiting = esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
  });
};

const bundle = async (rawCode: string) => {
  // kick off bundling process
  try {
    await waiting;
    const result = await esbuild.build({
      entryPoints: ["index.js"], //entry point for the build
      bundle: true,
      minify: true,
      write: false,
      loader: {
        ".js": "jsx",
      },
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)], // interconnecting the input that will be entered in the text box
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"), // setting up the environment for bundling
        global: "window", // replace global with window
      },
    });

    return {
      code: result.outputFiles[0].text,
      error: "",
    };
  } catch (err) {
    return {
      code: "",
      error: err.message,
    };
  }
};

export default bundle;
