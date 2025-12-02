import { axiosClient } from "../appClient";

export function loginUser(username: string, password: string) {
    return axiosClient.post("/auth/login", {
        username,
        password
    });
}