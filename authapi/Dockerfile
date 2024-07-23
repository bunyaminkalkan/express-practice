# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install ts-node-dev globally
RUN npm install -g ts-node-dev

# Make port 3000 available to the world outside this container
EXPOSE ${APP_PORT}

# Define the command to run the application in development mode
CMD ["npm", "run", "dev"]
