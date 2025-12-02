import { Form } from "@heroui/form"
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { Select, SelectItem } from "@heroui/select";
import { useParams } from "react-router-dom";
import { createExempleTask } from "@/types/task";

export default function TaskEditPage() {
  const { id } = useParams<{ id: string }>();
  const task = createExempleTask(id);

  if(id === undefined) {
    task.title = "";
    task.description = "";
    task.status = "todo";
    task.priority = "low";
    task.iniDate = "";
    task.endDate = "";
  }

  return (
    <div
      className="w-full h-full flex justify-center items-center"
    >
      <Form
        className="w-1/3 rounded-2xl bg-white p-6"
        validationBehavior="aria"
      >
        <Input
          isRequired
          isReadOnly
          name="id"
          label="Id"
          labelPlacement="outside"
          defaultValue={task.id}
        />
        <Input
          isRequired
          name="title"
          label="Título"
          labelPlacement="outside"
          placeholder="Insira o titulo"
          defaultValue={task.title}
        />
        <Textarea
          isRequired
          name="description"
          label="Descrição"
          labelPlacement="outside"
          placeholder="Insira a descrição"
          defaultValue={task.description}
        />
        <Select
          isRequired
          label="Status"
          placeholder="Selecione o status"
          labelPlacement="outside"
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
        >
            <SelectItem key="todo">A fazer</SelectItem>
            <SelectItem key="in-progress">Em Progresso</SelectItem>
            <SelectItem key="done">Concluído</SelectItem>
        </Select>
        <DatePicker
          isRequired
          name="iniDate"
          label="Data inicial"
          labelPlacement="outside"
        />
        <DatePicker
          isRequired
          name="endDate"
          label="Data final"
          labelPlacement="outside"
        />
        <div className="mt-6 flex justify-center gap-4 w-full">
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>
        </div>
      </Form>
    </div>
  );
}

// priority: "low" | "medium" | "high";