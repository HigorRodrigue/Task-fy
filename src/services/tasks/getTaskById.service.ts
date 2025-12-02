import { Task } from "@/types/task";
import { axiosClient } from "../appClient";

export default function getTaskById(id: string) : Promise<Task> {
    return axiosClient.get(`/tasks/${id}`, {
        headers: {
            token: localStorage.getItem("token") || "",
        }
    }).then(
        response => response.data as Task
    );
}