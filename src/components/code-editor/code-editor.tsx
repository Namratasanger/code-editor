import "./code-editor.css";
import "./syntax.css";
import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import * as prettier from "prettier";
import * as Parser from "prettier/parser-babel";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import MonacoJSXHighlighter, { JSXTypes } from "monaco-jsx-highlighter";

interface CodeEditorProps {
  initialValue: string;
  value: string;
  onChange(value: string): void;
}

const activateMonacoJSXHighlighter = async (monacoEditor, monaco) => {
  // instantiate the higlighter
  const monacoJSXHighlighter = new MonacoJSXHighlighter(
    monaco,
    parse,
    traverse,
    monacoEditor
  );

  // Start the JSX highlighting and get the dispose function
  let disposeJSXHighlighting =
    monacoJSXHighlighter.highlightOnDidChangeModelContent(
      // substiution for not consoling the errors in the browser console
      () => {},
      () => {},
      undefined,
      () => {}
    );
  console.log(disposeJSXHighlighting);
  // Enhance monaco's editor.action.commentLine with JSX commenting and get its disposer
  let disposeJSXCommenting = monacoJSXHighlighter.addJSXCommentCommand();
  // Optional: customize the color font in JSX texts (style class JSXElement.JSXText.tastyPizza from ./code-editor.css)
  JSXTypes.JSXText.options.inlineClassName = "JSXElement.JSXText.tastyPizza";

  return { monacoJSXHighlighter, disposeJSXHighlighting, disposeJSXCommenting };
};

function CodeEditor(props: CodeEditorProps) {
  const { onChange, initialValue, value } = props;

  const [editorValue, setEditorValue] = useState<string>(value);

  useEffect(() => {});

  useEffect(() => {
    setEditorValue(value);
  }, [onChange, value]);

  const onFormatClick = () => {
    // format the value
    const formatted = prettier
      .format(editorValue, {
        parser: "babel",
        plugins: [Parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    // set the formatted value back in the editor
    setEditorValue(formatted);
    onChange(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button is-primary is-link"
        onClick={() => onFormatClick()}
      >
        Format
      </button>
      <MonacoEditor
        defaultValue={initialValue}
        value={editorValue}
        onChange={onChange}
        onMount={activateMonacoJSXHighlighter}
        theme="vs-dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}

export default CodeEditor;