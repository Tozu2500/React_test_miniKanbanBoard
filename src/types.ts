
// Central place for shared types, keeping types in one file makes it easy
// to see the whole shape of the app's data

export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
    // crypto.randomUUID() value assigned at creation
    id: string;
    title: string;
    status: Status;
    /** `Date.now()` at creation time; not currently displayed, but handy
   * for a future "sort by newest" or "created X ago" feature. */
    createdAt: number;
  /** Optional `YYYY-MM-DD` string from an `<input type="date">`. Stored
   * as a plain string (not a `Date`) so it round-trips through
   * `JSON.stringify`/`localStorage` without any parsing on the way in. */
    dueDate?: string;
}

// A small lookup so we can render column titles from the Status value
// instead of hardcoding strings in multiple components
export const STATUS_LABELS: Record<Status, string> = {
    todo: 'To Do',
    'in-progress': 'In Progress',
    done: 'Done',
};

export const STATUS_ORDER: Status[] = ['todo', 'in-progress', 'done'];