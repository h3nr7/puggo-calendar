FROM node:10.3.0
COPY . /app

ADD ./package.json /tmp/package.json
WORKDIR /tmp
RUN pwd
RUN npm cache verify
RUN npm install webpack nodemon -g
RUN npm install

RUN pwd
RUN yes | cp -rf /tmp/node_modules /app/

WORKDIR /app

ENV NODE_ENV=development
ENV PORT=4000

EXPOSE 4000

CMD ["npm", "run", "start"]
