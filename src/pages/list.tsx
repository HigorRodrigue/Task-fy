import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Chip } from "@heroui/chip";
import getTasks from "@/services/tasks/getTasks.service";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";

export default function ListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }

    fetchTasks();
  }, []);

  return (
    <div
        className="w-full flex justify-center items-start p-20"
    >
        <Table
            className="max-h-full"
            aria-label="Example static collection table"
        >
        <TableHeader>
            <TableColumn>Id</TableColumn>
            <TableColumn>Título</TableColumn>
            <TableColumn>Descrição</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Prioridade</TableColumn>
            <TableColumn>Data Inicial</TableColumn>
            <TableColumn>Data Final</TableColumn>
        </TableHeader>
        <TableBody>
            {
                tasks.map((task) => (
                    <TableRow key={task.id}>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>
                            {
                                task.description.length > 50 ?
                                task.description.substring(0, 50) + "..." :
                                task.description
                            }
                        </TableCell>
                        <TableCell>
                            <Chip
                                color={
                                    task.status == "todo" ? "danger" :
                                    task.status == "in-progress" ? "warning" :
                                    task.status == "done" ? "success" :
                                    "default"
                                }
                            >
                                {
                                    task.status == "todo" ? "A Fazer" :
                                    task.status == "in-progress" ? "Em Progresso" :
                                    task.status == "done" ? "Concluído" :
                                    task.status
                                }
                            </Chip>
                        </TableCell>
                        <TableCell>
                            <Chip
                                color={
                                    task.priority == "high" ? "danger" :
                                    task.priority == "medium" ? "warning" :
                                    task.priority == "low" ? "success" :
                                    "default"
                                }
                            >
                                {
                                    task.priority == "high" ? "Alto" :
                                    task.priority == "medium" ? "Médio" :
                                    task.priority == "low" ? "Baixo" :
                                    task.priority
                                }
                            </Chip>
                        </TableCell>
                        <TableCell>{task.iniDate}</TableCell>
                        <TableCell>{task.endDate}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
        </Table>
    </div>
  );
}