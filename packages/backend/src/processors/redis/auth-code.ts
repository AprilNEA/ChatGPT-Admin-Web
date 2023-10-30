import { EntityId, EntityKeyName, Repository, Schema } from 'redis-om';

function generateRandomSixDigitNumber() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const authCodeSchemaName = 'authcode';
const authCodeSchema = new Schema(authCodeSchemaName, {
  code: { type: 'string' },
});

type NewResult = {
  success: boolean;
  code?: number;
  ttl: number;
};

export class AuthCode {
  private client: any;
  private repository: Repository;

  constructor(client: any) {
    this.client = client;
    this.repository = new Repository(authCodeSchema, client);
  }

  async new(identity: string): Promise<NewResult> {
    const ttl = await this.client.ttl(
      (await this.repository.fetch(identity))[EntityKeyName],
    );
    /* if key not exist, ttl will be -2 */
    if (600 - ttl < 60) {
      return {
        success: false,
        ttl,
      };
    }

    const new_ttl = 10 * 60;
    const code = generateRandomSixDigitNumber();
    const session = await this.repository.save(identity, {
      code,
    });
    await this.repository.expire(session[EntityId]!, new_ttl);

    return {
      success: true,
      code,
      ttl: new_ttl,
    };
  }

  async valid(identity: string, code: string): Promise<boolean> {
    return (await this.repository.fetch(identity)).code === code;
  }
}
