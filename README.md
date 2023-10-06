# NProjeto TCC

## Descrição

Este projeto é uma aplicação Node.js que utiliza o Directus CMS para gerenciamento das APIś. Directus é uma plataforma open-source de API em tempo real REST & GraphQL.


## Pré-requisitos


directus.yml
```
<pre>version: &apos;3.7&apos;
services:
  cache:
    image: redis:6
    restart: always

  directus:
    image: directus/directus:10.4.0
    restart: always
    ports:
      - 8055:8055
    volumes:
      - ./uploads:/directus/uploads
    depends_on:
      - cache
      - postgres
    environment:
    environment:
      KEY: &apos;255d861b-5ea1-5996-9aa3-922530ec40b1&apos;
      SECRET: &apos;6116487b-cda1-52c2-b5b5-c8022c45e263&apos;
      PUBLIC_GRAPHQL_URL: &apos;http://localhost/graphql&apos;
      ACCESS_CONTROL_ALLOW_ORIGIN: &apos;http://localhost:3000&apos;
      DB_CLIENT: &apos;pg&apos;
      DB_HOST: &apos;postgres&apos;
      DB_PORT: &apos;5432&apos;
      DB_DATABASE: &apos;postgres&apos;
      DB_USER: &apos;postgres&apos;
      DB_PASSWORD: &apos;postgres&apos;
      //CACHE_ENABLED: &apos;true&apos;
      //CACHE_STORE: &apos;redis&apos;
      //REDIS: &apos;redis://cache:6379&apos;
      ADMIN_EMAIL: &apos;admin@example.com&apos;
      ADMIN_PASSWORD: &apos;d1r3ctu5&apos;
      CORS_ENABLED: &apos;true&apos;
      CORS_ORIGIN: &apos;true&apos;
      CORS_METHODS: &apos;GET,POST,PATCH,DELETE&apos;
      CORS_ALLOWED_HEADERS: &apos;Content-Type,Authorization&apos;
</pre>


## Instalação

Clone o repositório:

```bash
$ git clone https://github.com/seu-usuario/nome-do-seu-projeto.git
$ cd nome-do-seu-projeto

