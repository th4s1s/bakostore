# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if exists) into the container at /app
COPY ./client/package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the current directory contents into the container at /app
COPY ./client .

# Add .env file with the specified content
RUN echo "VITE_API_BASE_URL=/api" > .env

# Make port 5173 available to the world outside this container
EXPOSE 5173

# Define environment variable
ENV NAME World

# Run the app when the container launches
CMD ["npm", "run", "dev"]