# --- Build stage ---
FROM node:16-alpine as builder

WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy other files
COPY web web
COPY .nvmrc .
COPY graphql.config.js .
COPY redwood.toml .

# Build the project
RUN yarn rw build web
RUN rm -rf ./web/src

# --- Run stage ---
FROM nginx as runner

# Copy files from build stage
COPY --from=builder /app/web/dist /usr/share/nginx/html
COPY web/nginx.conf /etc/nginx/conf.d/default.conf

# Debug: list files
RUN ls -lA /usr/share/nginx/html

# Default command
CMD ["nginx", "-g", "daemon off;"]

# Expose port
EXPOSE 8910
