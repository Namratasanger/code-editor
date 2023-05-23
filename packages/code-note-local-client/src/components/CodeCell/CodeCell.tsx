import "./code-cell.css";
import { useEffect } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import Resizable from "../StyleComponents/Resizable";
import { CellProperties } from "../../state-management";
import { useActions } from "../../hooks/use-actions";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useCumulativeCode } from "../../hooks/use-cumulative-code";

interface CodeCellProps {
  cell: CellProperties;
}

function CodeCell(props: CodeCellProps) {
  const {
    cell: { id, data },
  } = props;

  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles?.[id]);
  const cumulativeCode = useCumulativeCode(id, data);

  useEffect(() => {
    // initally we don't want the bundling process execution to wait for 1 sec window
    if (!bundle) {
      createBundle(id, cumulativeCode);
      return;
    }
    // debouncing the code execution
    const timer = setTimeout(async () => {
      // kick off the bundling process by passing the input code that needs to be bundled
      createBundle(id, cumulativeCode);
      //execute the code only after 1 sec od delay
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // adding bundle in the dependency array will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, id, data, createBundle]);

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
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            /* adding iframe to handle the code execution safely*/
            <Preview code={bundle?.code || ""} error={bundle?.error || ""} />
          )}
        </div>
      </div>
    </Resizable>
  );
}

export default CodeCell;
