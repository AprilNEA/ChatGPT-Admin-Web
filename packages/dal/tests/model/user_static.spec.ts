import { describe, expect, test } from '@jest/globals';
import { UserDAL, AccessControlDAL } from '../../src';

describe('list emails and get plans', () => {
  test('list the timestamps of non-free users', async () => {
    const emails = await UserDAL.listAllEmails();
    const plans = await UserDAL.getPlansOf(...emails);
    const nonFreeUsers = plans
      .map((plan, i) => [plan, emails[i]])
      .filter(([plan]) => plan !== 'free');

    console.log('non-free users:', nonFreeUsers);
    expect(nonFreeUsers.length).toBeGreaterThan(0);

    console.log(
      'timestamps of non-free users:',
      await AccessControlDAL.getRequestsTimeStampsOf(
        ...nonFreeUsers.map(([, email]) => email)
      )
    );
  });
});
