FROM node:18-alpine

WORKDIR /app

# Install MySQL client
RUN apk add --no-cache mysql-client

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

EXPOSE 8080

CMD ["npx", "nx", "serve-dev", "admin-service", "--configuration=docker"]