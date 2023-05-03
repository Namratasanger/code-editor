import "./text-editor.css";
import { useEffect, useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState();

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
      <MDEditor value={value} onChange={setValue} />
    </div>
  ) : (
    <div className="text-editor" onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={"# Code Editor in React App"} />
    </div>
  );
  return editor;
};

export default TextEditor;
