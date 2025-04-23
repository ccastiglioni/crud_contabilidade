Na pasta backend:
$ docker-compose up -d  ---build                 

aqui está o backEnd:
http://localhost:8000/

entra no container:
docker exec -it backend_contabilidade sh
criar o banco:
npx prisma migrate dev --name init



listagem:
http://localhost:3000/



