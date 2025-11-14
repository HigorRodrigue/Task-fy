import { Route, Routes, useNavigate } from "react-router-dom";

import KanbanPage from "./pages/kanban";
import ListPage from "./pages/list";
import LoginPage from "./pages/login";
import TaskEditPage from "./pages/taskEdit";
import TaskInfoPage from "./pages/taskInfo";


function App() {
  const navigate = useNavigate()

  function handlerClick(path: string) {
    navigate(path)
  }
  
  return (
    <div>
      <Routes>
        <Route path="/kanban" element={<KanbanPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/taskEdit" element={<TaskEditPage />} />
        <Route path="/taskEdit/:id" element={<TaskEditPage />} />
        <Route path="/taskInfo/:id" element={<TaskInfoPage />}/>
      </Routes>
      
     {/*<a href="kanban"> <button >Kanban</button> </a>*/}

     <button onClick={() => handlerClick("/kanban")} >Kandan - 2</button>
     <br />
     <button onClick={() => handlerClick("/login")} >login</button>
     <br />
     <button onClick={() => handlerClick("taskEdit")} >task edit</button>
     <br />
     <button onClick={() => handlerClick("/taskEdit/:id")} >taskedit1</button>
     <br />
     <button onClick={() => handlerClick("/taskInfo/:id")} >taskedit3</button>
    
    </div>
  );
}

export default App;
