Primeiro certifique que não tem nada Rodando na porta 80:
    sudo lsof -i :80
se tiver o apache ou lighttpd rodando, finalize!

Na pasta Raiz do projeto Rode:
    $ docker-compose up -d  ---build                 

Aqui está o backEnd:
    http://localhost:3000/


Sistema FrontEnd:
    http://empresacontabilidade.localhost/
