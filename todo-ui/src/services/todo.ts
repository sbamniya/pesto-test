import { APIListResponse, Pageable, Searchable } from "@app/types/generic";
import { Todo } from "@app/types/todo";
import { User } from "@app/types/user";
import restClient from "@app/utils/rest";

export const getTodos = async (
  query: Searchable & Pageable & { status?: Todo["status"] }
) =>
  restClient.get<
    APIListResponse<Todo & { assignee: Pick<User, "id" | "username"> }>
  >("/todos", query);

export const createTodo = async (
  data: Pick<
    Todo,
    "title" | "description" | "dueDate" | "assignedTo" | "status"
  >
) => restClient.post<Todo>("/todos", data);

export const updateTodo = async ({
  id,
  data,
}: {
  id: number;
  data: Pick<
    Todo,
    "title" | "description" | "dueDate" | "assignedTo" | "status"
  >;
}) => restClient.put<Todo>(`/todos/${id}`, data);
