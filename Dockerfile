FROM node:10.21.0-alpine3.11 as base

WORKDIR /app

COPY package*.json ./

RUN npm config list 
RUN npm ci 
RUN npm cache clean --force
RUN npm install --only=production

# dev
# docker image build -t bgg:dev --target dev .
# docker container run -it --name bggdev --rm -p 7890:7890 -v $PWD:/app/bgg-fe bgg:dev 
FROM base as dev

EXPOSE 7890:7890

ENV NODE_ENV=development

ENV PATH=/app/node_modules/.bin:$PATH

RUN npm install --only=development

WORKDIR /app/bgg-fe

CMD [ "npm", "run", "start" ]

FROM base as source

# WORKDIR /app/bgg-fe

COPY . .

RUN npm run build

# production
# docker image build -t bgg:prod --target prod .
# docker container run -it --name bggprod --rm -d -p 80:80 bgg:prod 
FROM nginx:1.18.0-alpine as prod

ENV NODE_ENV=production

# WORKDIR /app

EXPOSE 80:80

COPY --from=source /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"] 
