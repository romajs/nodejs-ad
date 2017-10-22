FROM debian:jessie

RUN apt-get update -y
RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

RUN AUTO_ADDED_PACKAGES=`apt-mark showauto`
RUN apt-get remove --purge -y curl $AUTO_ADDED_PACKAGES
RUN apt-get clean -y && rm -rf /var/lib/apt/lists/*

ARG uid=1000
ARG gid=1002

RUN groupadd -g ${gid} nodemon
RUN useradd -u ${uid} -g ${gid} -M -s /bin/false nodemon

USER nodemon

WORKDIR /code

ADD . /code

EXPOSE 8000

CMD ["./node_modules/.bin/nodemon", "./src/server.js"]