import "./text-editor.css";
import { useEffect, useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { CellProperties } from "../../state-management";
import { useActions } from "../../hooks/use-actions";

interface TextEditorProps {
  cell: CellProperties;
}

function TextEditor(props: TextEditorProps): JSX.Element {
  const {
    cell: { id, data },
  } = props;
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

  const { updateCell } = useActions();
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    window.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  const editor = editing ? (
    <div className="text-editor" ref={editorRef}>
      <MDEditor value={data} onChange={(v) => updateCell(id, v || "")} />
    </div>
  ) : (
    <div className="text-editor" onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={data || "Click To Edit"} />
    </div>
  );
  return editor;
}

export default TextEditor;
