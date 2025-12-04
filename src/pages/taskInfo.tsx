import { useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import getTaskById from "@/services/tasks/getTaskById.service";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";

export default function TaskInfoPage() {
    const { id } = useParams<{ id: string }>();
    const [ task, setTask ] = useState<Task | null>(null);

    
    useEffect(() => {
        async function fetchTasks(id: string) {
            const data = await getTaskById(id);
            setTask(data);
        }

        if(!id) {
            alert("ID da tarefa não fornecido.");
            window.history.back();
        } else {
            fetchTasks(id);
        }

    }, [id]);

    const navigate = useNavigate();
    
    function handleEdit() {
        navigate(`/taskEdit/${id}`);
    }

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4">
                <div className="flex justify-center w-full items-center gap-2 mb-4 cursor-pointer" onClick={handleEdit}>
                    <Pencil />
                    <span className="font-semibold text-gray-700">Editar</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-600">ID:</span>
                    <span className="text-gray-900">{task?.id}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-600">Título:</span>
                    <span className="text-gray-900">{task?.title}</span>
                </div>

                <div className="flex justify-between gap-10 border-b pb-2">
                    <span className="font-semibold text-gray-600">Descrição:</span>
                    <span className="text-gray-900">{task?.description}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-600">Status:</span>
                    <span className="text-gray-900">{task?.status}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-600">Prioridade:</span>
                    <span className="text-gray-900">{task?.priority}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-600">Início:</span>
                    <span className="text-gray-900">{task?.iniDate}</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">Fim:</span>
                    <span className="text-gray-900">{task?.endDate}</span>
                </div>
            </div>
        </div>
    );
}
    