import { InvitationCode, invitationCode } from "..";
import { AbstractDataAccessLayer } from "./abstract";

export class InvitationCodeDAL extends AbstractDataAccessLayer<InvitationCode> {
  readonly schema = invitationCode;
  readonly namespace: `${string}:` = "invitationCode:";

  protected async doCreate(
    code: string,
    data: InvitationCode,
  ): Promise<void> {
    await this.redis.json.set(this.getKey(code), "$", data);
  }

  protected doUpdate(
    code: string,
    data: Partial<InvitationCode>,
  ): Promise<void> {
    return this.doJSONUpdate(code, data);
  }

  async read(id: string): Promise<InvitationCode | null> {
    return (await this.redis.json.get(this.getKey(id), "$"))?.[0] ?? null;
  }
}
