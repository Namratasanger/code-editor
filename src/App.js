import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";

function App() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleClick = () => {
    setCode(input);
  };

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
      {code}
    </div>
  );
}

export default App;
