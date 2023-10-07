const clientId = process.env.BAIDU_APIKEY!;
const clientSecret = process.env.BAIDU_SECRETKEY!;

/**
 * Get access token
 * document: https://ai.baidu.com/ai-doc/REFERENCE/Ck3dwjhhu
 */
export async function getAccessToken() {
  const data = await (
    await fetch(
      "https://aip.baidubce.com/oauth/2.0/token?" +
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
  ).json();
  const { access_token, expires_in } = data;
  // console.log(JSON.stringify(data))
  return access_token;
}

interface returnType {
  log_id: number;
  conclusion: "合规" | "不合规";
  conclusionType: number;
  data: any;

  error_code?: number;
  error_msg?: string;
}

/**
 * Baidu cloud text security
 * Document: https://cloud.baidu.com/doc/ANTIPORN/s/Rk3h6xb3i
 * @param text
 */
export async function baiduTextSecurity(text: string) {
  /*
  Todo store access token in database
   */
  const data = (await (
    await fetch(
      `https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined?access_token=${await getAccessToken()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `text=${text}`,
      }
    )
  ).json()) as returnType;
  // if (data.error_code === 18) // error_msg : "Open api qps request limit reached"
  //   return
  // return data
  return data.conclusion === "合规";
}
