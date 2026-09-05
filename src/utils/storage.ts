// localStorage persistence for the board, with validation on the way back in
import type { Task } from "../types";
import { STATUS_ORDER } from "../types";

const STORAGE_KEY = 'react-task-board:tasks';

// Guards against a corrupted localStorage entry
function isTask(value: unknown): value is Task {
    if (typeof value !== 'object' || value == null) return false;

    const candidate = value as Record<string, unknown>;

    return (
        typeof candidate.id === 'string' &&
        typeof candidate.title === 'string' &&
        typeof candidate.createdAt === 'number' &&
        typeof candidate.status === 'string' &&
        STATUS_ORDER.includes(candidate.status as never) &&
        (candidate.dueDate === undefined || typeof candidate.dueDate === 'string')
    );
}

export function seedTasks(): Task[] {
    const now = Date.now();
    const minute = 60_000;

    return [
        { id: 's1', title: 'Read the Lesson panel →', status: 'todo', createdAt: now - 4 * minute },
        { id: 's2', title: 'Add a task with the form above', status: 'todo', createdAt: now - 3 * minute },
        { id: 's3', title: 'Drag a card into another column', status: 'in-progress', createdAt: now - 2 * minute },
        { id: 's4', title: 'Open src/state/tasksReducer.ts', status: 'done', createdAt: now - minute },
    ];
}

// Used as the lazy initializer of useReducer, so it runs once on mount
export function loadTasks(): Task[] {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw === null) return seedTasks();
    
        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed)) return seedTasks();

        // 'isTask' is a type guard, so this narrows unknown[] to Task[]
        return parsed.filter(isTask);
    } catch (error) {
        console.warn("Could not load saved tasks, starting fresh", error);
        return seedTasks();
    }
}

export function saveTasks(tasks: readonly Task[]): void {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.warn("Could not save tasks", error);
    }
}