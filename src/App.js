import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListUser from "./pages/listuser/listuser";
import CreateTask from "./pages/createtask/createtask";
import DeleteTask from "./pages/deletetask/deletetask";
import UpdateTask from "./pages/updatetask/updatetask";
import ListTask from "./pages/listtasks/listtasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ListUser />} />
        <Route path="/listuser" element={<ListUser />} />
        <Route path="/CreateTask" element={<CreateTask />} />
        <Route path="/UpdateTask" element={<UpdateTask />} />
        <Route path="/DeleteTask" element={<DeleteTask />} />
        <Route path="/ListTask" element={<ListTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
