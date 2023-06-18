import { mkdir, writeFile } from "node:fs/promises";

export async function saveJson(name: string, obj: unknown) {
  await mkdir("dumps").catch(() => {});
  const json = JSON.stringify(obj, null, 2);

  console.debug(`Saving ${name}.json...`);

  await writeFile(`dumps/${name}.json`, json);
}
