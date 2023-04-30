import { useState } from "react";
import CodeEditor from "../code-editor/code-editor";
import Preview from "../preview/preview";
import bundle from "../../bundler";

function CodeCell() {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleClick: () => void = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  const onChange: (inputCode: string) => void = (inputCode: string) => {
    setInput(inputCode);
  };

  return (
    <div>
      <CodeEditor
        initialValue="// Write your code here"
        onChange={onChange}
        value={input}
      />
      <div>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Submit
        </button>
      </div>

      {/* adding iframe to handle the code execution safely*/}
      <Preview code={code} />
    </div>
  );
}

export default CodeCell;
