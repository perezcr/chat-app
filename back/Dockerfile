FROM node:12.14.1-alpine

# Create app directory
WORKDIR /usr/src/app

# [<ubicacion de los archivos a copiar>, <destino donde van a quedar los archivos copiados>]
COPY package*.json ./

RUN npm install

# Copiar los demás archivos de la node app (docker cachea lo que ya tiene por lo tanto mejora el rendimiento al hacer las builds)
COPY . .

# Indica al contenedor el puerto por el cual va a exponer el contenedor, es el mismo puerto por donde esta escuchando node
EXPOSE 3000

# Run express
CMD ["npm", "run", "start:dev"]