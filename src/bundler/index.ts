import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const bundle = async (rawCode: string) => {
  // kick off bundling process
  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"], //entry point for the build
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)], // interconnecting the input that will be entered in the text box
      define: {
        "process.env.NODE_ENV": '"production"', // setting up the environment for bundling
        global: "window", // replace global with window
      },
    });

    return {
      code: result.outputFiles[0].text,
      error: "",
    };
  } catch (err) {
    return { code: "", error: err.message };
  }
};

export default bundle;
