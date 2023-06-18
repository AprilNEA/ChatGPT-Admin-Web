import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { KvEntry } from "../types/common";

const dumpPath = resolve(
  Bun.fileURLToPath(new URL(import.meta.url)),
  "../../dumps",
);

export async function saveJson(name: string, obj: unknown) {
  await mkdir(dumpPath).catch(() => {});
  const json = JSON.stringify(obj, null, 2);

  console.debug(`json: saving ${name}.json...`);
  await writeFile(`${dumpPath}/${name}.json`, json);
}

export async function loadJson<V = unknown>(
  name: string,
): Promise<KvEntry<V>[]> {
  console.debug(`json: loading ${name}.json...`);
  const json = await readFile(`${dumpPath}/${name}.json`, "utf-8");
  return JSON.parse(json);
}
