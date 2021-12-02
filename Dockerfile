FROM node:16.13.0-alpine
ENV DOCKER_DEFAULT_PLATFORM=linux/amd64

EXPOSE 3000

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
COPY /public /app/dist

CMD ["npm", "start"]