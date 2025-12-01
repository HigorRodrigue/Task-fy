import { arrayExempleTasks } from "@/types/task";
import ColumnKanban from "@/components/ColumnKanban";

export default function KanbanPage() {
    const tasks = arrayExempleTasks(20);

    const todoTasks = tasks.filter(task => task.status === "todo");
    const inProgressTasks = tasks.filter(task => task.status === "in-progress");
    const doneTasks = tasks.filter(task => task.status === "done");

    return (
        <div className="flex justify-evenly gap-4 p-4 w-full h-full">
            <ColumnKanban color="red" title="A fazer" tasks={todoTasks} />
            <ColumnKanban color="yellow" title="Em progresso" tasks={inProgressTasks} />
            <ColumnKanban color="green" title="Concluído" tasks={doneTasks} />
        </div>
    );
}