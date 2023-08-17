FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g pnpm


FROM base AS builder
# Set working directory
WORKDIR /app

COPY . .


RUN apk add --no-cache libc6-compat \
  & apk update \
  & pnpm add turbo -g \
  & pnpx turbo prune --scope=server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
#COPY --from=builder /app/packages/offercafe-database/prisma ./prisma/
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpx turbo run build
RUN pnpx turbo run db:generate \
  & pnpx turbo run build --filter=server...

CMD node /app/apps/offercafe-server/dist/main.js
