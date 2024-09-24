FROM node:20.15.0-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate && pnpm run build

EXPOSE 5000

CMD ["pnpm", "start"]
