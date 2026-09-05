// localStorage persistence for the board, with validation on the way back in
import type { Task } from "../types";
import { STATUS_ORDER } from "../types";

const STORAGE_KEY = 'react-task-board:tasks';

