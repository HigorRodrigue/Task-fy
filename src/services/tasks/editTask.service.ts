import { axiosClient } from "../appClient";
import type { Task } from "@/types/task";

export default function editTask(id: string, task: Task) {
    return axiosClient.put(`/editTask/${id}`, {
        headers: {
            token: localStorage.getItem("token") || "",
        },
        data: task
    });
}