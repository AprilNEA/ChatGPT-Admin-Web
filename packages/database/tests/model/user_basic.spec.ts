import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { UserDAL } from '../../src';

const TEST_EMAIL_1 = 'user-test-1@lmo.best';
const TEST_PASSWORD = '12345678';

describe('register and login user', () => {
  beforeAll(async () => {
    const user = await UserDAL.fromRegistration(TEST_EMAIL_1, TEST_PASSWORD);
    expect(user).not.toBeNull();
  });

  test('should not create a new user if the email is already taken', async () => {
    const user = await UserDAL.fromRegistration(TEST_EMAIL_1, TEST_PASSWORD);
    expect(user).toBeNull();
  });

  test('should login the user', async () => {
    const success = await new UserDAL(TEST_EMAIL_1).login(TEST_PASSWORD);

    expect(success).toBeTruthy();
  });

  test('should not login the user if the password is incorrect', async () => {
    const success = await new UserDAL(TEST_EMAIL_1).login(
      'incorrect' + TEST_PASSWORD
    );

    expect(success).toBeFalsy();
  });

  test('should not login the user if the email is incorrect', async () => {
    const success = await new UserDAL('incorrect' + TEST_EMAIL_1).login(
      TEST_PASSWORD
    );

    expect(success).toBeFalsy();
  });

  afterAll(async () => {
    const success = await new UserDAL(TEST_EMAIL_1).delete();

    expect(success).toBeTruthy();
  });
});
