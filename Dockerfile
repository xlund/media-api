FROM node:16
WORKDIR /src/api
COPY ./package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npx prisma db seed
RUN npx prisma db push
RUN npm run fetch
CMD [ "npm", "run", "start" ]
