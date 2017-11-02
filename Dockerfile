FROM node:6

WORKDIR /code

EXPOSE 8000

CMD ["./node_modules/.bin/nodemon", "./src/server.js"]