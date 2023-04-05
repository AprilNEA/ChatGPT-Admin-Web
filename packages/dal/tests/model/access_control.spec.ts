
// import { describe, expect, test } from "@jest/globals";
// import { AccessControlDAL, Model, UserDAL } from "../../src";
//
// const TEST_EMAIL = "test@lmo.best";
// const TEST_TOKEN = "ABCD";
//
// describe("create and validate session token", () => {
//   test("should create session token", async () => {
//     const token = await new AccessControlDAL(TEST_EMAIL)
//       .newSessionToken()
//
//     expect(token).toBeTruthy();
//   });
//
//   test("should not create new session token if it is IP", async () => {
//     const token = await new AccessControlDAL(TEST_EMAIL, true)
//       .newSessionToken()
//
//     expect(token).toBeFalsy();
//   });
//
//   test("should validate session token", async () => {
//     const isValid = await new AccessControlDAL(TEST_EMAIL)
//       .validateSessionToken(TEST_TOKEN);
//
//     expect(isValid).toBeTruthy();
//   });
//
//   test("should not validate session token if it is wrong", async () => {
//     const isValid = await new AccessControlDAL(TEST_EMAIL)
//       .validateSessionToken("wrong token");
//
//     expect(isValid).toBeFalsy();
//   });
// });
