FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .


RUN npm run build


# Serve the production version of the application with a static server

EXPOSE 8045

RUN npm run seed

CMD ["npm", "run", "start"]  
# Expose port 3000 so that it can be accessed from the host

# Set environment variables