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
  & pnpx turbo prune --scope=chat --docker


# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project
COPY ./config.yaml /app/config.yaml
COPY --from=builder /app/out/full/ .
RUN pnpx turbo run db:generate \
    & pnpx turbo run build --filter=chat...

FROM base AS runner

ENV HOSTNAME=0.0.0.0
ENV PORT=3000

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/chat/next.config.js .
COPY --from=installer /app/apps/chat/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/chat/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/chat/.next/static ./apps/chat/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/chat/public ./apps/chat/public

CMD node apps/chat/server.js
