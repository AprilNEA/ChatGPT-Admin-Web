import { describe, expect, test } from '@jest/globals';
import { UserDAL } from '../../src';

describe('list emails and get plans', () => {
  test('list the number of non-free users', async () => {
    const emails = await UserDAL.listAllEmails();
    const plans = await UserDAL.getPlansOf(...emails);
    const nonFreeUsers = plans.filter(plan => plan !== 'free').length;

    console.log('nonFreeUsers', nonFreeUsers, 'out of', plans.length, 'users');

    expect(nonFreeUsers).toBeGreaterThan(0);
  });
});
