# Alymente API v1

API REST desenvolvida com Node.js, Fastify e TypeScript, utilizando Prisma como ORM.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker e Docker Compose

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Nikaum-js/alymente-test-api
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env baseado no .env.example
NODE_ENV=dev
PORT=8888
```

4. Inicie o banco de dados PostgreSQL com Docker:
```bash
# No diretório do projeto
docker-compose up -d
```

## 🐳 Docker

O projeto utiliza Docker Compose para gerenciar o banco de dados PostgreSQL. Configuração do container:

```yaml
version: '3'

services:
  api-alymente-pg:
    image: bitnami/postgresql
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USERNAME: teste-alymente
      POSTGRES_PASSWORD: password123
      POSTGRES_DATABASE: alymente-db
```

## ⚡ Executando o projeto

### Desenvolvimento
```bash
npm run start:dev
# ou
yarn start:dev
```

### Produção
```bash
# Build do projeto
npm run build
# ou
yarn build

# Iniciar em produção
npm start
# ou
yarn start
```

## 🧪 Testes

### Executar todos os testes
```bash
npm test
# ou
yarn test
```

### Executar testes em modo watch
```bash
npm run test:watch
# ou
yarn test:watch
```

### Verificar cobertura de testes
```bash
npm run test:coverage
# ou
yarn test:coverage
```

## 📚 Documentação da API (Swagger)

### Endpoints Disponíveis

#### Pessoas (Persons)

- **GET /person**
  - Lista todas as pessoas cadastradas
  - Suporta paginação através dos query params `page` e `perPage`
  - Exemplo: `GET /person?page=1&perPage=10`

- **POST /person**
  - Cadastra uma nova pessoa
  - Requer body JSON com os campos:
    ```json
    {
      "name": "João Silva",
      "email": "joao@email.com",
      "dateOfBirth": "1990-01-01",
      "cpf": "123.456.789-00",
      "phone": "(11) 98765-4321",
      "address": "Rua das Flores, 123",
      "city": "São Paulo",
      "state": "SP"
    }
    ```

- **GET /person/{id}**
  - Retorna os dados de uma pessoa específica
  - Exemplo: `GET /person/123e4567-e89b-12d3-a456-426614174000`

- **PUT /person/{id}**
  - Atualiza os dados de uma pessoa
  - Aceita atualização parcial dos campos

- **DELETE /person/{id}**
  - Remove uma pessoa do sistema

### Acessando a Documentação

Após iniciar o servidor, a documentação completa da API estará disponível em:

- Swagger UI: `http://localhost:8888/docs`
- JSON OpenAPI: `http://localhost:8888/docs/json`
- YAML OpenAPI: `http://localhost:8888/docs/yaml`
```

## 🛠️ Principais funcionalidades

- Configuração com Fastify
- Validação de dados com Zod
- Documentação automática com Swagger
- Suporte a CORS
- Tratamento de erros centralizado
- Testes automatizados com Vitest
- Banco de dados PostgreSQL com Docker
