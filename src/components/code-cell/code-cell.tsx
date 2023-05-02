import { useState, useEffect } from "react";
import CodeEditor from "../code-editor/code-editor";
import Preview from "../preview/preview";
import bundle from "../../bundler";
import Resizable from "../styled-components/resizable";

function CodeCell() {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState("");
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      // kick off the bundling process by passing the input code that needs to be bundled
      const output = await bundle(input);
      setCode(output.code);
      setError(output.error);
      //execute the code only after 3 sec
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const onChange: (inputCode: string) => void = (inputCode: string) => {
    setInput(inputCode);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="// Write your code here"
            onChange={onChange}
            value={input}
          />
        </Resizable>
        {/* adding iframe to handle the code execution safely*/}
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
