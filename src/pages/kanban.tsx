import { Task } from "@/types/task";
import ColumnKanban from "@/components/ColumnKanban";
import { useEffect, useState } from "react";
import getTasks from "@/services/tasks/getTasks.service";

export default function KanbanPage() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
    async function fetchTasks() {
        const data = await getTasks();
        setTasks(data);
    }

    fetchTasks();
    }, []);

    const todoTasks = tasks.filter(task => task.status === "todo");
    const inProgressTasks = tasks.filter(task => task.status === "in-progress");
    const doneTasks = tasks.filter(task => task.status === "done");

    return (
        <div className="flex justify-evenly gap-4 p-4 w-full">
            <ColumnKanban color="red" title="A fazer" tasks={todoTasks} />
            <ColumnKanban color="yellow" title="Em progresso" tasks={inProgressTasks} />
            <ColumnKanban color="green" title="Concluído" tasks={doneTasks} />
        </div>
    );
}