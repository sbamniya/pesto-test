import { GenericFields } from "./generic";

export type User = GenericFields & {
  username: string;
  password: string;
};
