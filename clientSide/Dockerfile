
FROM node:10.15.0-jessie AS builder
COPY ./ /clientSide
WORKDIR /clientSide
RUN npm install

FROM node:10.15.0-jessie
COPY --from=builder /clientSide/node_modules /clientSide/node_modules
COPY --from=builder /clientSide/package*.json /clientSide/
COPY --from=builder /clientSide/server.js /clientSide/
COPY --from=builder /clientSide/public /clientSide/public
WORKDIR /clientSide
EXPOSE 3000
CMD [ "node", "server.js" ]


