FROM debian:jessie

RUN apt-get update -y && rm -rf /var/lib/apt/lists/*
RUN AUTO_ADDED_PACKAGES=`apt-mark showauto`
RUN apt-get remove --purge -y $BUILD_PACKAGES $AUTO_ADDED_PACKAGES

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

RUN RUNTIME_PACKAGES="curl nodejs"
RUN apt-get install -y $RUNTIME_PACKAGES && apt-get clean -y

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