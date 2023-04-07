import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { UserDAL } from '../../src';
import { redis } from '../../src/redis/client';

const TEST_EMAIL_1 = 'user-test-1@lmo.best';
const TEST_EMAIL_2 = 'user-test-2@lmo.best';
const TEST_PASSWORD = '12345678';

describe('user invitation', () => {
  const codes: string[] = [];

  beforeAll(async () => {
    const user1 = await UserDAL.fromRegistration(TEST_EMAIL_1, TEST_PASSWORD);
    expect(user1).not.toBeNull();
    const user2 = await UserDAL.fromRegistration(TEST_EMAIL_2, TEST_PASSWORD);
    expect(user2).not.toBeNull();
  });

  test('user1 invite user2', async () => {
    const user1 = new UserDAL(TEST_EMAIL_1);
    const user2 = new UserDAL(TEST_EMAIL_2);
    expect(await user1.exists()).toBeTruthy();
    expect(await user2.exists()).toBeTruthy();

    const code = await user1.newInvitationCode('test');
    codes.push(code);
    const acceptedCode = await user2.acceptInvitationCode(code);

    // 0. the code should be valid
    expect(acceptedCode).not.toBeNull();
    // 1. user1 should have this code in its list
    const success1 = (await user1.getInvitationCodes()).includes(code);
    expect(success1).toBeTruthy();
    // 2. the inviterCode of user2 should be set correctly
    const success2 = (await user2.getInviterCode()) === code;
    expect(success2).toBeTruthy();
    // 3. the code should have recorded the emails of both
    expect(acceptedCode?.inviteeEmails).toEqual([TEST_EMAIL_2]);
    expect(acceptedCode?.inviterEmail).toEqual(TEST_EMAIL_1);
  });

  afterAll(async () => {
    // clear users
    const success1 = await new UserDAL(TEST_EMAIL_1).delete();
    expect(success1).toBeTruthy();
    const success2 = await new UserDAL(TEST_EMAIL_2).delete();
    expect(success2).toBeTruthy();

    // clear codes
    await Promise.all(codes.map(code => redis.del(`invitationCode:${code}`)));
  });
});
