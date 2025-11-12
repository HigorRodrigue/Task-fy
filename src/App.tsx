import { Route, Routes } from "react-router-dom";

import KanbanPage from "./pages/kanban";
import ListPage from "./pages/list";
import LoginPage from "./pages/login";
import TaskEditPage from "./pages/taskEdit";
import TaskInfoPage from "./pages/taskInfo";


function App() {
  return (
    <Routes>
      <Route path="/kanban" element={<KanbanPage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/taskEdit" element={<TaskEditPage />} />
      <Route path="/taskEdit/:id" element={<TaskEditPage />} />
      <Route path="/taskInfo/:id" element={<TaskInfoPage />}/>
    </Routes>
  );
}

export default App;
