import { APIListResponse } from "@app/types/generic";
import { User } from "@app/types/user";
import restClient from "@app/utils/rest";

export const getUsers = () => restClient.get<APIListResponse<User>>("/users");
