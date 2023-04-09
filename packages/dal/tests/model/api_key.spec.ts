import { describe, expect, test } from "@jest/globals";
import { APIKeyDAL } from "../../src";

describe("APIKeyDAL", () => {
  test("get and set ***REMOVED*** cookie", async () => {
    const firstCookie = await APIKeyDAL.getLexCookie();
    expect(firstCookie).toBeTruthy();

    await APIKeyDAL.setLexSession("this is a test session");
    const secondCookie = await APIKeyDAL.getLexCookie();
    expect(secondCookie).toMatch("_***REMOVED***_session=this%20is%20a%20test%20session");
  });
});
