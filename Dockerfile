FROM node:16.13.0-alpine
ENV DOCKER_DEFAULT_PLATFORM=linux/amd64

EXPOSE 3000

WORKDIR /app
COPY . /app
COPY utils/wait-for.sh wait-for.sh
RUN chmod +x wait-for.sh
RUN npm install
RUN npm run build