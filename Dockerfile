###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine as development

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node prisma ./prisma/

# COPY ENV variable
# COPY prod.env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Copy application dependency manifests to the container image.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user frrom the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# Copy over the node_modules in order to gain access to the Nest CLI.
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node prisma ./prisma/

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Generate PrismaClient artifact
# RUN npx prisma generate

# Create the database in production/staging
# RUN npx prisma db push

# Apply pending migrations to the database in production/staging
# RUN npx prisma migrate deploy

# Seed the database with initial data
# RUN npx prisma db seed

# Install production dependencies
# RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:16-alpine as production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/package*.json ./
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma

RUN npx prisma generate

# Expose port 8080
EXPOSE 8080

# Run the app
CMD [ "npm", "run", "start:migrate:prod" ]

