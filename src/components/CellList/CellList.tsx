import * as React from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { CellProperties } from "../../state-management";
import CellListItem from "./CellListItem";

// lists of cells to the users
// fetch the list of cells from the redux store
function CellList(): React.ReactNode {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id: string) => data[id])
  );

  const renderCells = (
    <>
      {cells?.map((cell: CellProperties) => (
        <CellListItem cell={cell} key={cell.id} />
      ))}
    </>
  );
  return <div>{renderCells}</div>;
}
export default CellList;
