### STAGE 1: Build ###
FROM node:18-alpine AS build
#ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
# Copy app files
COPY . .
# Expose port
#EXPOSE 80
# Build Prod App
#CMD ["npm", "run", "build"]
RUN npm run build
#RUN mv default.conf /etc/nginx/http.d
#RUN nginx
#ENTRYPOINT ["sh"]

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html