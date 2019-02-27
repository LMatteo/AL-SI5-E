
FROM node:10.15.0-jessie AS builder
COPY ./ /blablamove
WORKDIR /blablamove
RUN npm install && npm run build

FROM node:10.15.0-jessie
RUN apt-get update \
    && apt-get install -y mysql-client\
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /blablamove/node_modules /blablamove/node_modules
COPY --from=builder /blablamove/package*.json /blablamove/
COPY --from=builder /blablamove/ormconfig.js /blablamove/ormconfig.js
COPY --from=builder /blablamove/dist /blablamove/dist
WORKDIR /blablamove
EXPOSE 8080
COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh
ENTRYPOINT ./entrypoint.sh


