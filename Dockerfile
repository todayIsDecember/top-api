FROM node:20-alpine
WORKDIR /app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
CMD ["node", "./dist/main.js"]