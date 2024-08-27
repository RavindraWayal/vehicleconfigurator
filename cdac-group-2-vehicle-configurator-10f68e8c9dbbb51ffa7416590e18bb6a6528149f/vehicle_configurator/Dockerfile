# Start with a base image containing OpenJDK 17
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged Spring Boot jar into the container
COPY target/vehicle-configurator.jar /app/vehicle-configurator.jar

# Expose port 8080 to the outside world
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/vehicle-configurator.jar"]
