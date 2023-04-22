import * as esbuild from "esbuild-wasm";
import { useState, useEffect } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin.ts";

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

  const handleClick = async () => {
    const result = await esbuild.build({
      entryPoints: ["index.js"], //entry point for the build
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        "process.env.NODE_ENV": '"production"', // setting up the environemtn for bundling
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
