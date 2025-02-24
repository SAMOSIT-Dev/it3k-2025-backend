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
COPY libs ./libs

EXPOSE 8086

CMD ["npx", "nx", "serve-dev", "popcat-service", "--verbose", "--configuration=docker"]