import { useEffect } from "react";
import CellList from "./components/CellList/CellList.tsx";
import { setupBundle } from "./bundler/index";

function App() {
  useEffect(() => {
    setupBundle();
  }, []);

  return (
    <div>
      <CellList />
    </div>
  );
}

export default App;
