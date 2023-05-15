import { useState, useEffect } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import bundle from "../../bundler";
import Resizable from "../StyleComponents/Resizable";
import { CellProperties } from "../../state-management";
import { useActions } from "../../hooks/use-actions";

interface CodeCellProps {
  cell: CellProperties;
}

function CodeCell(props: CodeCellProps) {
  const {
    cell: { id, data },
  } = props;
  const [error, setError] = useState("");
  const [code, setCode] = useState<string>("");

  const { updateCell } = useActions();

  useEffect(() => {
    // debouncing the code execution
    const timer = setTimeout(async () => {
      // kick off the bundling process by passing the input code that needs to be bundled
      const output = await bundle(data);
      setCode(output.code);
      setError(output.error);
      //execute the code only after 1 sec od delay
    }, 1);

    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  const onChange: (inputCode: string) => void = (inputCode: string) => {
    updateCell(id, inputCode);
  };

  return (
    <Resizable direction="vertical">
      <div
        style={{
          // allocate space to reisze bar
          height: "calc(100% - 8px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor initialValue={data} onChange={onChange} value={data} />
        </Resizable>
        {/* adding iframe to handle the code execution safely*/}
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
