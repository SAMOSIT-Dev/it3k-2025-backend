FROM node:18-alpine

WORKDIR /app

# Copy all configuration files
COPY package.json package-lock.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY jest.preset.js ./
COPY eslint.config.cjs ./

RUN npm ci
RUN npm install -g nx

# Copy source code and libs
COPY apps ./apps

EXPOSE 8085

CMD ["npx", "nx", "serve", "pingpong-service", "--configuration=docker"]