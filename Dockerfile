# Use official Node.js image as base
FROM node:22

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
