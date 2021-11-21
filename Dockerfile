# FROM  --platform=linux/amd64 node:12.22.0
FROM node:16.13.0-alpine
ENV DOCKER_DEFAULT_PLATFORM=linux/amd64

EXPOSE 3000

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

CMD ["npm", "start"]