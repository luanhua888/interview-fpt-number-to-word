import { Routes, Route } from "react-router-dom";
import ChangePage from "./Page/ChangePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ChangePage />} />
      </Routes>
    </div>
  );
}

export default App;
