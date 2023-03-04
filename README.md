# Microtrendtales template
Este repositorio contiene un proyecto web hecho con Gatsby y un microservicio de publicación de contenido para ejecutar en AWS Lambda.

## Estructura del repositorio
El repositorio está organizado en dos carpetas principales:

frontend: contiene el contenido del sitio web hecho en Gatsby.
lambda_microservice: contiene el código del microservicio para ejecutar en AWS Lambda.

## Frontend
El contenido del sitio web se encuentra en la carpeta frontend. Para ejecutar el proyecto, primero asegúrese de tener instalado Node.js y Gatsby.

Una vez instalados, puede seguir los siguientes pasos para ejecutar el proyecto:

Abra una terminal y navegue a la carpeta frontend.
Ejecute el comando npm install para instalar las dependencias del proyecto.
Ejecute el comando gatsby develop para iniciar el servidor de desarrollo.
Abra un navegador web y visite http://localhost:8000 para ver el sitio web.

## Microservicio de publicación Lambda
El microservicio para AWS Lambda se encuentra en la carpeta lambda_microservice. Está escrito en Node.js y Lambda Layer para poder ejecutarse.

Para ejecutar el microservicio localmente, siga estos pasos:

Abra una terminal y navegue a la carpeta microservicio.

Instale los siguientes paquetes en la carpeta lambda_microservice de nodeJS mediante el comando npm install:

npm install axios openai aws-sdk twit

Finalmente ejecute la función:

node index.js

---

Si lo que quiere es ejecutarlo en la nube, cree una función Lambda con el contenido de index.js y cree, posteriormente una Lambda Layer con las librerías mencionadas anteriormente (axios, openai y twit).