FROM registry.access.redhat.com/ubi8/openjdk-17:1.14

USER root
RUN microdnf install -y tar gzip

USER 185
WORKDIR /code

COPY --chown=185 .mvn/ .mvn/
COPY --chown=185 mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY --chown=185 src src
RUN ./mvnw package -DskipTests

FROM registry.access.redhat.com/ubi8/openjdk-17-runtime:1.14
ENV LANGUAGE='en_US:en'
COPY --from=0 --chown=185 /code/target/quarkus-app/lib/ /deployments/lib/
COPY --from=0 --chown=185 /code/target/quarkus-app/*.jar /deployments/
COPY --from=0 --chown=185 /code/target/quarkus-app/app/ /deployments/app/
COPY --from=0 --chown=185 /code/target/quarkus-app/quarkus/ /deployments/quarkus/
EXPOSE 8080
USER 185
ENV AB_JOLOKIA_OFF=""
ENV JAVA_OPTS="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"