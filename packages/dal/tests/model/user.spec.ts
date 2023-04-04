import { describe, expect, test } from "@jest/globals";
import { Register, UserDAL } from "../../src";

const TEST_EMAIL = "test@lmo.best";
const TEST_PASSWORD = "12345";

describe("register and login user", () => {
  beforeAll(async () => {
    const user = await UserDAL.fromRegistration(TEST_EMAIL, TEST_PASSWORD);
    expect(user).not.toBeNull();
  });

  test("should not create a new user if the email is already taken", async () => {
    const user = await UserDAL.fromRegistration(TEST_EMAIL, TEST_PASSWORD);
    expect(user).toBeNull();
  });

  test("should login the user", async () => {
    const success = await new UserDAL(TEST_EMAIL).login(TEST_PASSWORD);

    expect(success).toBeTruthy();
  });

  test("should not login the user if the password is incorrect", async () => {
    const success = await new UserDAL(TEST_EMAIL)
      .login("incorrect" + TEST_PASSWORD);

    expect(success).toBeFalsy();
  });

  test("should not login the user if the email is incorrect", async () => {
    const success = await new UserDAL("incorrect" + TEST_EMAIL)
      .login(TEST_PASSWORD);

    expect(success).toBeFalsy();
  });

  afterAll(async () => {
    const success = await new UserDAL(TEST_EMAIL).delete();

    expect(success).toBeTruthy();
  });
});

describe("get and activate email register code", () => {
  test("should get the email register code", async () => {
    const { code, status } = await new UserDAL(TEST_EMAIL).newRegisterCode(
      "email",
    );
    expect(status).toBe(Register.ReturnStatus.Success);
    expect(code).toBeDefined();
  });

  test("should activate the email register code", async () => {
    const user = new UserDAL(TEST_EMAIL);
    const { status, code } = await user.newRegisterCode("email");
    expect(status).toBe(Register.ReturnStatus.Success);
    expect(code).toBeDefined();

    const success = await user.activateRegisterCode(code + "", "email");

    expect(success).toBeTruthy();
  });

  test("should not activate the email register code if it is already activated", async () => {
    const user = new UserDAL(TEST_EMAIL);
    const { code } = await user.newRegisterCode("email");
    expect(code).toBeDefined();

    await user.activateRegisterCode(code + "", "email");
    const success = await user.activateRegisterCode(code + "", "email");

    expect(success).toBeFalsy();
  });

  test("should not activate the register code if it is invalid", async () => {
    const success = await new UserDAL(TEST_EMAIL).activateRegisterCode(
      0,
      "email",
    );

    expect(success).toBeFalsy();
  });
});
