FROM node:lts-iron as build-stage

ARG VITE_API_BACKEND_URL
ENV VITE_API_BACKEND_URL=$VITE_API_BACKEND_URL

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]