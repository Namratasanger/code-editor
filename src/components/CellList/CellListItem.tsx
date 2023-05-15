import "./cell-list-item.css";
import { CellProperties } from "../../state-management";
import TextEditor from "../TextEditor/TextEditor";
import * as React from "react";
import { CellTypes } from "../../state-management";
import CodeCell from "../CodeCell/CodeCell";
import ActionBar from "../ActionBar/ActionBar";

// show an individual cell
// delete a cell or move it up an down

interface CellListItemProps {
  cell: CellProperties;
}

type CellMapping = {
  [key in CellTypes]: React.ReactNode;
};

function CellListItem(props: CellListItemProps): React.ReactElement {
  const { cell } = props;

  const cellTypeMapping: CellMapping = {
    code: (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    ),
    text: (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    ),
  };

  return <div className="cell-list-item">{cellTypeMapping[cell.type]}</div>;
}
export default CellListItem;
