import { create } from "zustand";

interface State {
    name: string | null;
    token: string | null;
    role: "admin" | "user" | null;
}

interface Actions {
    setAuth: ({ name, token, role } : State) => void;
    clearAuth: () => void;
}