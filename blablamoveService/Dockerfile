
FROM node:10.15.0-jessie AS builder
COPY ./ /blablamove
WORKDIR /blablamove
RUN npm install && npm run build

FROM node:10.15.0-jessie
COPY --from=builder /blablamove/typescript/dist /blablamove/
WORKDIR /blablamove
EXPOSE 8080
CMD [ "npm", "start" ]


