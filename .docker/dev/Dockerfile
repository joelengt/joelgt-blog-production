FROM node:4.2

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

RUN npm install --production
RUN npm install handlebars --save

# Bundle app source
COPY . .

EXPOSE 2368
CMD [ "npm", "start"]
