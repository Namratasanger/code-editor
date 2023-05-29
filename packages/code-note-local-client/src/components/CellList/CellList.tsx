import { useEffect, Fragment } from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { CellProperties } from "../../state-management";
import CellListItem from "./CellListItem";
import AddCell from "../AddCell/AddCell";
import { useActions } from "../../hooks/use-actions";

// lists of cells to the users

function CellList(): React.ReactNode {
  // fetch the list of cells from the redux store
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id: string) => data[id])
  );

  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  useEffect(() => {
    saveCells();
  }, [JSON.stringify(cells)]);

  const renderCells = (
    <>
      {cells?.map((cell: CellProperties) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellId={cell.id} />
        </Fragment>
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
