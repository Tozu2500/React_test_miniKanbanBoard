// Filtering by free text search and stats, pure so it's unit tested
// directly instead of through a component.
import type { Status, Task } from "../types";

// The status union widened with one literal, rather than a separate flag
export type StatusFilter = Status | 'all';

export interface FilterOptions {
    search: string;
    status: StatusFilter;
}

export function filterTasks(tasks: readonly Task[], options: FilterOptions): Task[] {
    // Normalise once, not once per task
    const needle = options.search.trim().toLowerCase();

    return tasks.filter((task) => {
        const matchesStatus = options.status === 'all' || task.status === options.status;
        const matchesSearch = needle === '' || task.title.toLowerCase().includes(needle);
        return matchesStatus && matchesSearch;
    });
}