import { Form } from "@heroui/form"
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { Select, SelectItem } from "@heroui/select";
import { useParams } from "react-router-dom";
import { Task } from "@/types/task";
import getTaskById from "@/services/tasks/getTaskById.service";
import { FormEvent, useEffect, useState } from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import editTask from "@/services/tasks/editTask.service";
import newTask from "@/services/tasks/newTask.service";

export default function TaskEditPage() {
  const { id } = useParams<{ id: string }>();
  const [ title, setTitle ] = useState<string>("");
  const [ description, setDescription ] = useState<string>("");
  const [ status, setStatus ] = useState<"todo" | "in-progress" | "done">("todo");
  const [ priority, setPriority ] = useState<"low" | "medium" | "high">("low");
  const [ iniDate, setIniDate ] = useState<string>("");
  const [ endDate, setEndDate ] = useState<string>("");

  useEffect(() => {
    if(id) {
      getTaskById(id).then((response) => {
        const task: Task = response;
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
        setIniDate(task.iniDate ?? "");
        setEndDate(task.endDate ?? "");
      }).catch((error) => {
        console.error("Error fetching task:", error);
      });
    }
  }, [id]);

  function handleSubmit(e : FormEvent) {
    e.preventDefault();
    const task : Task = {
      id: id || "",
      title,
      description,
      status,
      priority,
      iniDate: iniDate || undefined,
      endDate: endDate || undefined,
    }

    if(id) {
      editTask(id, task).then(() => {
        alert("Task edited successfully!");
      }).catch((error) => {
        console.error("Error editing task:", error);
      });
    } else {
      newTask(task).then(() => {
        alert("Task created successfully!");
      }).catch((error) => {
        console.error("Error creating task:", error);
      });
    }

    window.location.href = "/taskInfo/" + (id || task.id);
  }

  return (
    <div
      className="w-full h-full flex justify-center items-center"
    >
      <Form
        className="w-1/3 rounded-2xl bg-white p-6"
        validationBehavior="aria"
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          isReadOnly
          name="id"
          label="Id"
          labelPlacement="outside"
          value={id}
        />
        <Input
          isRequired
          name="title"
          label="Título"
          labelPlacement="outside"
          placeholder="Insira o titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          isRequired
          name="description"
          label="Descrição"
          labelPlacement="outside"
          placeholder="Insira a descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select
          isRequired
          label="Status"
          placeholder="Selecione o status"
          labelPlacement="outside"
          onChange={(value) => setStatus(value.target.value as "todo" | "in-progress" | "done")}
          defaultSelectedKeys={[status]}
        >
            <SelectItem key="todo">A fazer</SelectItem>
            <SelectItem key="in-progress">Em Progresso</SelectItem>
            <SelectItem key="done">Concluído</SelectItem>
        </Select>
        <Select
          isRequired
          label="Prioridade"
          placeholder="Selecione a prioridade"
          labelPlacement="outside"
          onChange={(value) => setPriority(value.target.value as "low" | "medium" | "high")}
          defaultSelectedKeys={[priority]}
        >
            <SelectItem key="low">Baixa</SelectItem>
            <SelectItem key="medium">Média</SelectItem>
            <SelectItem key="high">Alta</SelectItem>
        </Select>
        <DatePicker
          isRequired
          name="iniDate"
          label="Data inicial"
          labelPlacement="outside"
          value={iniDate ? parseDate(iniDate) : undefined}
          onChange={(value) => setIniDate(value?.toString() || "")}
        />
        <DatePicker
          isRequired
          name="endDate"
          label="Data final"
          labelPlacement="outside"
          value={endDate ? parseDate(endDate) : undefined}
          onChange={(value) => setEndDate(value?.toString() || "")}
        />
        <div className="mt-6 flex justify-center gap-4 w-full">
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>
        </div>
      </Form>
    </div>
  );
}