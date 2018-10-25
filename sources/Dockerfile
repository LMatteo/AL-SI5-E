FROM maven:3.5.4-jdk-8 AS builder
COPY ./ /blablamove/
WORKDIR /blablamove/
RUN mvn install -DskipTests
WORKDIR /blablamove/dist
RUN mvn tomee:start

FROM maven:3.5.4-jdk-8
COPY --from=builder /root/.m2 /root/.m2
COPY --from=builder /blablamove/pom.xml /blablamove/
COPY --from=builder /blablamove/dist/target /blablamove/dist/target
COPY --from=builder /blablamove/dist/pom.xml /blablamove/dist/
WORKDIR /blablamove/dist
CMD ["mvn",  "tomee:run"]