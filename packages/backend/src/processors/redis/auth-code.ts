import { EntityId, Repository, Schema } from 'redis-om';

export function generateRandomSixDigitNumber() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const authCodeSchema = new Schema('authcode', {
  code: { type: 'string' },
});

export class AuthCode {
  private repository: Repository;

  constructor(client: any) {
    this.repository = new Repository(authCodeSchema, client);
  }

  async new(identity: string): Promise<number> {
    const code = generateRandomSixDigitNumber();
    const session = await this.repository.save(identity, {
      code,
    });
    await this.repository.expire(session[EntityId]!, 10 * 60);
    return code;
  }

  async valid(identity: string, code: string): Promise<boolean> {
    return (await this.repository.fetch(identity)).code === code;
  }
}
