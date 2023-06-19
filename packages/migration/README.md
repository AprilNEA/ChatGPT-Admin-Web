# @caw/migration

## Basic Usage

First, fill `.env` according to `.env.example`.

Then, run the following command:

```shell
bun run scripts/dump_redis.ts
bun run scripts/json_to_csv.ts
bun run scripts/import_csv.ts
```

The last script will give you commands to execute in `psql`.
