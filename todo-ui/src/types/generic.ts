import { AxiosError } from "axios";

export type Nullable<T> = T | null;

export type APIErrorResponse = AxiosError<{
  message: string;
  code: string;
  errors?: unknown;
}>;


export type APIListResponse<T> = {
  data: T[];
  total: number;
}

export type GenericFields = {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export type Pageable = {
  page?: number;
  limit?: number;
}
export type Searchable = {
  search?: string;
}