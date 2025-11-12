import { useParams } from "react-router-dom";
import { createExempleTask } from "../types/task";

export default function TaskInfoPage() {
    const { id } = useParams<{ id: string }>();
    const task = createExempleTask(id);

    return (
        <div>
            <div>
                
                <p>Id = {task.id}</p>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
                <p>Start Date: {task.iniDate}</p>
                <p>End Date: {task.endDate}</p>
            </div>
        </div>
    );
}
    