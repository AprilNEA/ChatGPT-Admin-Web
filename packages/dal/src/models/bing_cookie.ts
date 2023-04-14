import { AbstractTokenPool } from "./abstract_token_pool";

class BingCookiePool extends AbstractTokenPool {
  protected override redisKey = "bing:cookies";
  protected override ttl = 60;
}

export default new BingCookiePool();
