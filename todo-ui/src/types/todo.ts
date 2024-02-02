import { GenericFields, Nullable } from "./generic";

export type TodoStatus = "Pending" | "Completed" | "Inprogress";

export type Todo = GenericFields & {
  title: string;
  description?: Nullable<string>;
  status: TodoStatus;
  assignedTo?: Nullable<number>;
  createdBy: number;
  dueDate?: Nullable<string>;
};
