import { Task } from "@/types/task";
import CardKanban from "@/components/CardKanban";
import { Divider } from "@heroui/divider";

interface Props {
    color: 'red' | 'yellow' | 'green';
    title: string;
    tasks: Task[];
}

export default function ColumnKanban({ color, title, tasks }: Props) {
    return (
        <div className={"flex flex-col overflow-y-auto rounded p-4 w-124 scrollbar-hide gap-3 " + (color === 'red' ? ' bg-red-100' : color === 'yellow' ? ' bg-yellow-100' : ' bg-green-100')}>
            <h2 className="font-bold text-2xl mb-2 self-center">
                {title}
            </h2>
            <Divider />
            <div className="flex flex-col gap-2">
                {tasks.map((task) => (
                    <CardKanban
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        content={task.description}
                        status={task.status}
                    />
                ))}
            </div>
        </div>
    )
}
