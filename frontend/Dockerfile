FROM node:22-alpine AS build

ARG VITE_API_URL=https://anagram-finder-backend-production.up.railway.app/api
# In Railway i use Docker Hub instead of GitHub,
# Env vars are ignored by vite, hardcoded as a fallback.
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]