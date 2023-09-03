# Use Node.js image
FROM node:16

# Set working directory
WORKDIR /frontend

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Run the client
CMD ["npm", "run", "dev"]
