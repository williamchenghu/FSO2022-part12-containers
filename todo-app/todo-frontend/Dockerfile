FROM node:16 as build
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci
RUN npm run build
ENV DEBUG=todo-backend:*
USER node
CMD ["npm", "start"]

FROM nginx:1.20-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80