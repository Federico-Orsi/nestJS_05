import { UserRoles } from "src/enums/user-roles.enum";

export interface User_model {
  id: number;
  username: string;
  password: string;
  role: UserRoles;
  address: string;
  age: number;
  created_at: Date;
}