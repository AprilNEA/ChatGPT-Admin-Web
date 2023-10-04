FROM node:20-alpine AS base

USER root

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm i -g pnpm

FROM base AS builder

WORKDIR /app

COPY . .


RUN apk add --no-cache libc6-compat \
  & apk update \
  & pnpm add turbo -g \
  & pnpx turbo prune --scope=server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

RUN apk add --no-cache libc6-compat \
  & apk update

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/apps/server/run.sh ./apps/server/run.sh

RUN pnpx turbo run db:generate \
    & pnpx turbo run build

WORKDIR /app/apps/server

CMD pnpx prisma migrate deploy && node /app/apps/server/dist/main.js
