# Use the specific version of the SDK that includes the required framework version
FROM mcr.microsoft.com/dotnet/sdk:8.0.201 AS build-env
WORKDIR /app

# Install EF Core CLI globally
RUN dotnet tool install --global dotnet-ef --version 8.0.2
ENV PATH="${PATH}:/root/.dotnet/tools"

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image using the ASP.NET runtime instead of the SDK
FROM mcr.microsoft.com/dotnet/aspnet:8.0.2 AS runtime-env
WORKDIR /app

# Copy the global tools directory from the build environment
COPY --from=build-env /root/.dotnet /root/.dotnet
ENV PATH="${PATH}:/root/.dotnet/tools"

COPY --from=build-env /app/out .

RUN apt-get update 
RUN apt-get install -y postgresql-client

# Expose the port that the app will listen on
EXPOSE 8080

# Set the entrypoint script to be executed when the container starts
ENTRYPOINT ["dotnet", "cosmos-oddysey-backend.dll"]
