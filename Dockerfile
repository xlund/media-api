FROM node:16
WORKDIR /src/api
COPY ./package*.json .
RUN npm install
COPY . .
RUN npx prisma db push
RUN npx prisma db seed
CMD [ "npm", "run", "start" ]
