FROM node:24-alpine

WORKDIR /app

COPY package.json pnpm-* ./

RUN corepack enable && \
    pnpm install --frozen-lockfile

CMD ["pnpm", "run", "dev"]
