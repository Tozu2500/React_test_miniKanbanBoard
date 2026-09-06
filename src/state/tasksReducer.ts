// Every task state transition in one pure function. The rules of the app live
// here, the components only dispatch
import { Status, Task } from "../types";

// A discriminated union: the literal type field tells TypeScript which
// payload each action carries inside the switch below
export type TaskAction =
    | { type: 'task/added'; id: string; title: string; createdAt: number; dueDate?: string }
    | { type: 'task/renamed'; id: string; title: string }
    | { type: 'task/moved'; id: string; status: Status }
    | { type: 'task/deleted'; id: string }
    | { type: 'task/doneCleared' };

// Pure: ids and timestamps arrive inside the action rather than being
// generated here. Every branch returns a new array, and reuses the objects of
// tasks it did not change so memo can skip their cards
export function tasksReducer(state: Task[], action: TaskAction): Task[] {
    switch (action.type) {
        case 'task/added': {
            const task: Task = {
                id: action.id,
                title: action.title,
                status: 'todo',
                createdAt: action.createdAt,
                dueDate: action.dueDate,
            };
            return [...state, task];
        }

        case 'task/renamed':
            return state.map((task) =>
                task.id === action.id ? { ...task, title: action.title } : task,
            );

        case 'task/moved':
            return state.map((task) =>
                task.id === action.id ? { ...task, status: action.status } : task,
            );

        case 'task/deleted':
            return state.filter((task) => task.id !== action.id);

        case 'task/doneCleared':
            return state.filter((task) => task.status !== 'done');

        default: {
            // Fails to compile if a new TaskAction member has no case above
            const unhandled: never = action;
            return unhandled;
        }
    }
}