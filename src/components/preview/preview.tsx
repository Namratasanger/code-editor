import "./preview.css";
import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
<html>
<head>
  <style>html { background-color: white; }</style>
</head>
<body>
  <div id="root"></div>
  <script>
    const handleError = (err) => {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
      console.error(err);
    };

    window.addEventListener('error', (event) => {
      event.preventDefault();
      handleError(event.error);
    });

    window.addEventListener('message', (event) => {
      try {
        eval(event.data);
      } catch (err) {
        handleError(err);
      }
    }, false);
  </script>
</body>
</html>
  `;

function Preview(props: PreviewProps): JSX.Element {
  const { code, error } = props;
  const iframeRef = useRef<any>();

  useEffect(() => {
    // reassigning iframe srcDoc just in case the dom gets empty
    iframeRef.current.srcDoc = html;
    // get the bundled code
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    /* adding iframe to handle the code execution safely*/
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && <div className="error-preview">Runtime Error {error}</div>}
    </div>
  );
}

export default Preview;
