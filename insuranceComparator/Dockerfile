
FROM node:10.15.0-jessie AS builder
COPY ./ /insuranceComparator
WORKDIR /insuranceComparator
RUN npm install && npm run build

FROM node:10.15.0-jessie
COPY --from=builder /insuranceComparator/node_modules /insuranceComparator/node_modules
COPY --from=builder /insuranceComparator/package*.json /insuranceComparator/
COPY --from=builder /insuranceComparator/dist /insuranceComparator/dist
WORKDIR /insuranceComparator
EXPOSE 7080
CMD [ "npm", "start" ]


