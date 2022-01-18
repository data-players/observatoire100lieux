#FROM node:lts-alpine3.13 as build-step
#WORKDIR /usr/src/app/frontend
#COPY package*.json ./
#RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
#EXPOSE 42010
#CMD ["npm", "run-script", "start-docker"]

FROM node:16 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/transistionangular /usr/share/nginx/html

# Copy conf
COPY docker/nginx-conf /etc/nginx/conf.d/


# Expose port 80
EXPOSE 80
