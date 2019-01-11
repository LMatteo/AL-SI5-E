
FROM node:10.15.0-jessie AS builder
COPY ./ /blablamove
WORKDIR /blablamove
RUN npm install && npm run build

FROM node:10.15.0-jessie
COPY --from=builder /blablamove/node_modules /blablamove/
COPY --from=builder /blablamove/package*.json /blablamove/
COPY --from=builder /blablamove/dist /blablamove/
WORKDIR /blablamove
EXPOSE 8080
CMD [ "npm", "start" ]


