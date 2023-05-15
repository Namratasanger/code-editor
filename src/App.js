import { useEffect } from "react";
import CellList from "./components/CellList/CellList.tsx";
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
      <CellList />
    </div>
  );
}

export default App;
