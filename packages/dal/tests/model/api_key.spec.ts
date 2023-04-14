import { describe, expect, test } from "@jest/globals";
import { APIKeyDAL, BingCookiePool } from "../../src";

describe("APIKeyDAL", () => {
  test("get and set ***REMOVED*** cookie", async () => {
    const firstCookie = await APIKeyDAL.getLexCookie();
    expect(firstCookie).toBeTruthy();

    await APIKeyDAL.setLexSession("this is a test session");
    const secondCookie = await APIKeyDAL.getLexCookie();
    expect(secondCookie).toMatch("_***REMOVED***_session=this%20is%20a%20test%20session");
  });

  test("get and set bing cookie", async () => {
    const cookie = await BingCookiePool.acquire();
  });
});
