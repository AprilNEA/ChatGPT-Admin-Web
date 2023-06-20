# @caw/migration

## Basic Usage

1. install `bun` and `prisma` CLI

2. clear your postgres database and run `prisma db push`

3. fill `.env` according to `.env.example`.

4. run the following command:

```shell
bun run scripts/dump_redis.ts
bun run scripts/json_to_csv.ts
bun run scripts/import_csv.ts
```

The last script will give you commands to execute in `psql`.
