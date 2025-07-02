# 📊 Sistema Contábil - CRUD com Docker, Next.js e Prisma

Sistema completo de gerenciamento contábil com backend e frontend separados, integrados via Docker Compose.

---

## 🚀 Tecnologias Utilizadas

- 🐳 Docker + Docker Compose
- 🔧 Backend: **Next.js (API routes)** com **Prisma ORM**
- 🎨 Frontend: **Vite + React**
- 🛢️ Banco de Dados: **PostgreSQL**
- 🌐 Servidor Proxy: **NGINX**

---

## ⚠️ Pré-requisitos

Antes de rodar, certifique-se de que **nenhum serviço esteja utilizando a porta 80**:

```bash
sudo lsof -i :80

sudo systemctl stop apache2
# ou
sudo systemctl stop lighttpd


🛠️ Como iniciar o projeto? Na pasta raiz do projeto, execute:
docker-compose up -d --build

🔗 Acessos Rápidos
🧠 Backend (API + Prisma):
http://localhost:3000

💼 Frontend (Sistema Web):
http://localhost

```
---

## 📦 Estrutura do Projeto

crud_contabilidade/
├── backend/      # API Next.js + Prisma
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   └── src/app/api/
├── frontend/     # Vite + React
│   ├── public/
│   └── src/
├── images/       # Imagens para o README
├── docker-compose.yml
├── nginx.conf
└── README.md

Se você quiser zerar todos os dados **:

```bash
docker compose exec postgres psql -U cleber -d crud_contabilidade

TRUNCATE TABLE venda, compra, cliente, fornecedor, produto RESTART IDENTITY CASCADE;

```

## 💻 Tela do Sistema
![Tela do sistema](images/sistema.png)

