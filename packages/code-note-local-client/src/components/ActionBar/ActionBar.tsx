import "./action-bar.css";
import { useActions } from "../../hooks/use-actions";

interface ActionBarProps {
  id: string;
}

function ActionButton(props) {
  const { action, spanClass } = props;
  return (
    <>
      <button className="button is-primary is-small" onClick={action}>
        <span className="icon">
          <i className={spanClass}></i>
        </span>
      </button>
    </>
  );
}

export default function ActionBar(props: ActionBarProps) {
  const { id } = props;

  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <ActionButton
        action={() => moveCell(id, "up")}
        spanClass="fas fa-arrow-up"
      />
      <ActionButton
        action={() => moveCell(id, "down")}
        spanClass="fas fa-arrow-down"
      />
      <ActionButton action={() => deleteCell(id)} spanClass="fas fa-trash" />
    </div>
  );
}
