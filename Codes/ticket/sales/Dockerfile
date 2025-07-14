# Estágio 1: Build com Maven
# Usa uma imagem do Maven para compilar nosso projeto Java
FROM maven:3.9-eclipse-temurin-17-focal AS build
WORKDIR /app
# Copia apenas o pom.xml primeiro para aproveitar o cache do Docker
COPY pom.xml .
# Baixa as dependências
RUN mvn dependency:go-offline
# Copia o resto do código-fonte e compila
COPY src ./src
RUN mvn package -DskipTests

# Estágio 2: Imagem Final
# Usa uma imagem leve do Java para rodar a aplicação
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copia o .jar compilado do estágio de build
COPY --from=build /app/target/*.jar app.jar
# Expõe a porta
EXPOSE 8080
# Comando para rodar
ENTRYPOINT ["java", "-jar", "app.jar"]