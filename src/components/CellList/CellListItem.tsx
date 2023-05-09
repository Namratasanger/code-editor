import { CellProperties } from "../../state-management";
import TextEditor from "../TextEditor/TextEditor";
import * as React from "react";
import { CellTypes } from "../../state-management";
import CodeCell from "../CodeCell/CodeCell";

// show an individual cell
// delete a cell or move it up an down

interface CellListItemProps {
  cell: CellProperties;
}

type CellMapping = {
  [key in CellTypes]: (cell: CellProperties) => React.ReactNode;
};

const cellTypeMapping: CellMapping = {
  code: (cell) => <CodeCell cell={cell} />,
  text: (cell) => <TextEditor cell={cell} />,
};
function CellListItem(props: CellListItemProps): React.ReactElement {
  const { cell } = props;
  return <div>{cellTypeMapping[cell.type](cell)}</div>;
}
export default CellListItem;
