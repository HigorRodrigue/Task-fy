import { LoremIpsum } from "lorem-ipsum";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    iniDate?: string;
    endDate?: string;
}

export function createExempleTask( id? : string): Task {
    return {
        id:  id ?? Math.random().toString(36).substring(2, 9),
        title: new LoremIpsum().generateWords(3),
        description: new LoremIpsum().generateSentences(2),
        status: (["todo", "in-progress", "done"] as const)[Math.floor(Math.random() * 3)],
        priority: (["low", "medium", "high"] as const)[Math.floor(Math.random() * 3)],
        iniDate: new Date().toISOString().split("T")[0],
 
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],        
    }
}

// vou criar uma função para criar tasks de exemplo (ramdomizadas)
// ai vai da pra testar elas no meio do projeto sem conexã o com o back