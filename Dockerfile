FROM node:6

WORKDIR /app

ADD ./api /app/api
ADD ./web /app/web
ADD ./node_modules /app/node_modules
ADD ./package.json /app/package.json

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]