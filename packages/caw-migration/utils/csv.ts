import { mkdir, writeFile } from "node:fs/promises";
import { dumpPath } from "./common";
import { DataItem, stringify } from "./stringify_csv";

export async function saveCsv(name: string, data: DataItem[]) {
  await mkdir(dumpPath).catch(() => {});
  const csv_string = stringify(data, { columns: Object.keys(data[0]) })
    .replaceAll("[]", "{}"); // Postgres uses {} for empty arrays

  console.debug(`csv: saving ${name}.csv...`);
  await writeFile(`${dumpPath}/${name}.csv`, csv_string);
}
