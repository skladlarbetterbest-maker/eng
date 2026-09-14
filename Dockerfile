# Node.js LTS base image
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application files
COPY . .

# Expose port
EXPOSE 3005

ENV PORT=3005
ENV NODE_ENV=production

CMD ["npm", "start"]
