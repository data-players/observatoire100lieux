
FROM node:15 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN yarn install

# Generate the build of the application
RUN yarn run build-prod

CMD [ "yarn", "run","start" ]
