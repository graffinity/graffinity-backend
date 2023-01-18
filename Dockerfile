###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine as development

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node ./prisma/ /usr/src/app/prisma/

# COPY tsconfig.json file
COPY tsconfig.json /usr/src/app/

# Copy application dependency manifests to the container image.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node ./ /usr/src/app/

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# Copy over the node_modules in order to gain access to the Nest CLI.
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node ./prisma/ /usr/src/app/prisma/

COPY --chown=node:node ./ /usr/src/app/

# Generate the prisma client
RUN npx prisma generate

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

USER node

###################
# PRODUCTION
###################

FROM node:16-alpine as production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/package*.json ./
COPY --chown=node:node --from=build /usr/src/app/dist/ ./dist/
COPY --chown=node:node --from=build /usr/src/app/prisma/ ./prisma/

# Set NODE_ENV environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory
WORKDIR /usr/src/app

RUN npx prisma generate
RUN npx prisma migrate deploy

# Install production dependencies
# RUN npm ci --only=production && npm cache clean --force

# Expose port 8080
EXPOSE 8080

# Run the app
CMD [ "node", "dist/main" ]

