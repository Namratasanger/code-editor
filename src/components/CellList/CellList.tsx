import * as React from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { CellProperties } from "../../state-management";
import CellListItem from "./CellListItem";
import AddCell from "../AddCell/AddCell";

// lists of cells to the users
// fetch the list of cells from the redux store
function CellList(): React.ReactNode {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id: string) => data[id])
  );

  const renderCells = (
    <>
      {cells?.map((cell: CellProperties) => (
        <React.Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellId={cell.id} />
        </React.Fragment>
      ))}
    </>
  );
  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderCells}
    </div>
  );
}
export default CellList;
