import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const bundle = async (rawCode: string) => {
  // kick off bundling process
  const result = await esbuild.build({
    entryPoints: ["index.js"], //entry point for the build
    bundle: true,
    write: false,
    // interconnecting the input that will be entered in the text box
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      "process.env.NODE_ENV": '"production"', // setting up the environment for bundling
      global: "window", // replace global with window
    },
  });

  return result.outputFiles[0].text;
};

export default bundle;
