# Use a specific version of node for consistency across environments
FROM node:16-alpine

# Set the working directory in the Docker container
WORKDIR /app

# Copy necessary files from host to container
# Note: Files are listed individually instead of copying everything
# to avoid including unnecessary files in the Docker image

# Copy api directory and its content
COPY api api

# Copy Node Version Manager configuration file
COPY .nvmrc .

# Copy GraphQL configuration file
COPY graphql.config.js .

# Copy package.json and yarn.lock to install dependencies
COPY package.json .
COPY yarn.lock .

# Copy Redwood configuration file
COPY redwood.toml .

# Copy scripts directory and its content
COPY scripts .

# Install the dependencies in the local node_modules folder
RUN yarn install

# Add react and react-dom libraries ignoring workspace root check
RUN yarn add react react-dom --ignore-workspace-root-check

# Build the api for deployment
RUN yarn rw build api

# Remove the source directory of the api after building it for deployment, 
# this is done to reduce the image size
RUN rm -rf ./api/src

# Change working directory to api inside /app
WORKDIR /app/api

# Expose port 8911 to be accessible from outside the container
EXPOSE 8911

# Start the server when the Docker image is run
ENTRYPOINT [ "yarn", "rw", "serve", "api", "--port", "8911", "--rootPath", "/api" ]
