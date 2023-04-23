import * as esbuild from "esbuild-wasm";
import { useState, useEffect } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin.ts";
import { fetchPlugin } from "./plugins/fetch-plugin.ts";

function App() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    await esbuild.initialize({
      wasmURL: "/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  // kick off bundling process
  const handleClick = async () => {
    const result = await esbuild.build({
      entryPoints: ["index.js"], //entry point for the build
      bundle: true,
      write: false,
      // interconnecting the input that will be entered in the text box
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"', // setting up the environment for bundling
        global: "window", // replace global with window
      },
    });

    console.log(result?.outputFiles[0]);
    setCode(result?.outputFiles[0]?.text);
  };

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <div>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Submit
        </button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
