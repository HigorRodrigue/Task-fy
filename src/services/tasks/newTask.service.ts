import { axiosClient } from "../appClient";
import type { Task } from "@/types/task";

export default function newTask(task : Task) {
    return axiosClient.post("/newTask", {
        headers: {
            token: localStorage.getItem("token") || "",
        },
        data: task
    });
}