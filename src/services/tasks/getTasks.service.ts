import { Task } from "@/types/task";
import { axiosClient } from "../appClient";

export default function getTasks() {
    return axiosClient.get("/tasks", {
        headers: {
            token: localStorage.getItem("token") || "",
        }
    }).then(
            response => response.data as Task[]
    );
}