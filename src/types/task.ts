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
    const firstLetter = new LoremIpsum().generateWords(2)
    const title = firstLetter.charAt(0).toUpperCase() + firstLetter.slice(1);
    return {
        id:  id ?? Math.random().toString(36).substring(2, 9),
        title: title,
        description: new LoremIpsum().generateSentences(2),
        status: (["todo", "in-progress", "done"] as const)[Math.floor(Math.random() * 3)],
        priority: (["low", "medium", "high"] as const)[Math.floor(Math.random() * 3)],
        iniDate: new Date().toISOString().split("T")[0],
 
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],        
    }
}

export function arrayExempleTasks(quantity: number): Task[] {
    const tasks: Task[] = [];
    for (let i = 0; i < quantity; i++) {
        tasks.push( createExempleTask() );
    }
    return tasks;
}