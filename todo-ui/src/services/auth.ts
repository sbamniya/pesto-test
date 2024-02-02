import { User } from "@app/types/user";
import restClient from "@app/utils/rest";

export const login = (data: Pick<User, "username" | "password">) =>
  restClient.post<{ token: string }>("/auth/login", data);

export const signup = (
  data: Pick<User, "username" | "password"> & {
    confirmPassword: User["password"];
  }
) => restClient.post<{ token: string }>("/auth/register", data);
