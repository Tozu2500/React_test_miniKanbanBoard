// Sorting. One comparator per SortMode, plus a guard for turning the plain
// strings the DOM gives us back into a SortMode.
import type { Task } from '../types';

// A closed set of options: a typo is a compile error, and the Record below
// stops compiling if a mode is added without a comparator.
export type SortMode = 'created-desc' | 'created-asc' | 'due-date' | 'title';

export const SORT_LABELS: Record<SortMode, string> = {
    'created-desc': 'Newest first',
    'created-asc': 'Oldest first',
    'due-date': 'Due date',
    title: 'Title (A→Z)',
};

type Comparator = (a: Task, b: Task) => number;

const COMPARATORS: Record<SortMode, Comparator> = {
    'created-desc': (a, b) => b.createdAt - a.createdAt,
    'created-asc': (a, b) => a.createdAt - b.createdAt,
    'due-date': (a, b) => {
        // Tasks without a due date sort to the bottom rather than to 1970.
        if (a.dueDate === b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate < b.dueDate ? -1 : 1;
    },
    title: (a, b) => a.title.localeCompare(b.title),
};

// Copies first: .sort() method mutates, and React state must not be mutated
export function sortTasks(tasks: readonly Task[], mode: SortMode): Task[] {
    return [...tasks].sort(COMPARATORS[mode]);
}

export function isSortMode(value: string): value is SortMode {
    return value in SORT_LABELS;
}