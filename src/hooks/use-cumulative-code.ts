import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string, cellContent: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunction =
      // custom function implementation where user can simply call show(value) to show content in the iframe
      `
      // renaming the imports to remove naming collision
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      let show = (value) => {
        const root = document.querySelector('#root');
        if(typeof value === 'object'){
          if(value.$$typeof && value.props){
            _ReactDOM.render(value, root);
          }
          else{
            root.innerHTML = JSON.stringify(value);
          }
        }else{
          root.innerHTML = value;
        }
      };
      `;

    const showFunctionNoOperation = "let show = () => {}";
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code" && cellContent !== "") {
        // if the current cell is the one that is being executed perform following operations:
        // Yes : the real version of the show function
        // No : no operation show function
        if (c.id === cellId) {
          cumulativeCode.push(showFunction);
        } else {
          cumulativeCode.push(showFunctionNoOperation);
        }
        cumulativeCode.push(c.data);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join("\n");
};
