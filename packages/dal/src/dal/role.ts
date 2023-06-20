import client from "@caw/database";
import type { Role } from "@prisma/client";

export class RoleDAL {
  constructor() {}

  async getRoles(): Promise<Role[]> {
    return await client.role.findMany();
  }
}
