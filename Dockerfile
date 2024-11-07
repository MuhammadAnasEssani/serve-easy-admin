FROM node:14.20
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
COPY . /usr/src/app
COPY .env-staging /usr/src/app/.env
COPY start.sh /usr/src/app/
RUN yarn install
EXPOSE 3000

RUN chmod u+x /usr/src/app/start.sh
ENTRYPOINT [ "/usr/src/app/start.sh" ]
# CMD ["yarn", "start"]