FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

ARG uid=1000
ARG gid=1002

RUN groupadd -g ${gid} nodemon
RUN useradd -u ${uid} -g ${gid} nodemon

WORKDIR /home/nodemon

USER nodemon

ADD . code/

WORKDIR /home/nodemon/code

EXPOSE 8000

CMD ["./node_modules/.bin/nodemon", "./src/server.js"]