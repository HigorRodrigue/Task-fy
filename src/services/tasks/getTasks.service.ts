import { axiosClient } from "../appClient";

export default function getTasks() {
    return axiosClient.get("/tasks", {
        headers: {
            token: localStorage.getItem("token") || "",
        }
    });
}