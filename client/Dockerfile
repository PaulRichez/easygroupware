# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:lts-alpine as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install --force

# Generate the build of the application
RUN npm run build -- --output-path=./dist/out


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/out /usr/share/nginx/html

# single page
# Copy the respective nginx configuration files
COPY nginx_config/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
