FROM node:18.16.0

WORKDIR /front

ENV PATH /front/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@5.0.1 -g


COPY . ./

CMD ["npm", "start"]