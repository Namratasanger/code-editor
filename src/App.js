import { useEffect } from "react";
import CodeCell from "./components/code-cell/code-cell.tsx";
import TextEditor from "./components/text-editor/text-editor.tsx";
import * as esbuild from "esbuild-wasm";

function App() {
  useEffect(() => {
    // initialize the esbuild it will be called once i.e. haven't transferred to the bundler code
    (async () => {
      await esbuild.initialize({
        wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
      });
    })();
  }, []);

  return (
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
}

export default App;
