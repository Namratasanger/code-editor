import * as esbuild from "esbuild-wasm";
import { useEffect, useRef } from "react";

function App() {
  const ref = useRef();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    console.log(ref.current);
  };

  useEffect(() => {
    startService();
  }, []);

  return <div></div>;
}

export default App;
