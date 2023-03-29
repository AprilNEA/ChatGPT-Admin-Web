export class LexGPT {
  constructor(private cookie: string, private max_tokens = 500) {}

  private static apiURL = "https://***REMOVED***.page/ai/ask";

  private getForm(text: string): FormData {
    const form = new FormData();
    form.append("text", text);
    form.append("gpt_model", "gpt-3.5-turbo");
    form.append("max_tokens", this.max_tokens.toString());
    return form;
  }

  complete(prompt: string) {
    const form = this.getForm(prompt);
    return fetch(LexGPT.apiURL, {
      method: "POST",
      body: form,
      headers: {
        "Cookie": this.cookie,
      },
    });
  }
}
