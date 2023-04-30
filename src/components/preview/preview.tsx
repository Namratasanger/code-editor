import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event)=>{
            try{
              eval(event.data);
            }catch(err){
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"> <h4>Runtime Error</h4>' + err + '</div>';
              console.error(err); 
            }
          }, false);
        </script>
      </body>
    </html>
  `;

function Preview(props: PreviewProps): JSX.Element {
  const { code } = props;
  const iframeRef = useRef<any>();

  useEffect(() => {
    // reassigning iframe srcDoc just in case the dom gets empty
    if (iframeRef?.current) {
      iframeRef.current.srcDoc = html;
    }

    // get the bundled code
    iframeRef.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    /* adding iframe to handle the code execution safely*/
    <iframe
      title="preview"
      ref={iframeRef}
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
}

export default Preview;
