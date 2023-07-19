# API de Agendamentos em SOLID 🚀

Esta é uma API escrita em Express com TypeScript, que tem como objetivo gerenciar um site de agendamentos para uma barbearia. A API utiliza autenticação com JWT e agendamentos com date-fns.

## Tecnologias utilizadas

- ExpressJS
- TypeScript
- Date fns
- Prisma
- SQLite
- Repository pattern

## Configuração do ambiente de desenvolvimento local

1. Clone o repositório.
2. Execute o comando `npx tsc --init` para criar um arquivo de configurações de TypeScript.
3. No arquivo `tsconfig.json`, verifique se as configurações `target` está definida como `"ES2020"`, `module` como `"commonjs"`, `outDir` como `"./dist"`, e `rootDir` como `"./src"`.
4. Instale o `ts-node-dev` usando o comando `npm i ts-node-dev -D`.
5. No arquivo `package.json`, adicione o seguinte script: `"dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"`. Esse script é responsável por compilar o TypeScript em JavaScript e iniciar o servidor.
6. Instale as dependências do projeto executando o comando `npm install`.

## Dependências do projeto

- `@prisma/client`: ^4.15.0
- `bcrypt`: ^5.1.0
- `date-fns`: ^2.30.0
- `express`: ^4.18.2
- `jsonwebtoken`: ^9.0.0

##Para instalar as dependências, execute o seguinte comando:

```bash
npm install
```
#### Executando o projeto localmente

Para iniciar o servidor localmente, execute o seguinte comando:

```bash
npm run dev
```

## Principais endpoints da API

- **POST** `/schedules`: Cria um novo agendamento. Parâmetros necessários no corpo da requisição:
  ```json
  {
    "name": "teste",
    "phone": "81997210434",
    "date": "2023-06-11T14:39:46.438Z",
    "user_id": "39c17bf7-90fb-447c-bcf6-c5cdee3826bb"
  }
  ```
 - **GET** `/schedules`: Retorna todos os agendamentos em uma determinada data. Parâmetros necessários na query string:
  `date=2023-06-11T13:39:46.438Z`
  
 - **GET** /schedules/user: Retorna os agendamentos de um usuário específico. O user_id é obtido a partir do token de autenticação.

 - **PUT** /schedules: Edita um agendamento existente. Parâmetros necessários no corpo da requisição:
```json
{
  "name": "teste",
  "phone": "81997210434",
  "date": "2023-06-13T14:39:46.438Z",
  "id": "f9150194-f904-4b7e-8d0e-35e069afde31"
}
```
- **DELETE** /schedules: Remove um agendamento do banco de dados. Parâmetro necessário no corpo da requisição:

```json
{
  "id": "f9150194-f904-4b7e-8d0e-35e069afde31"
}
```
- **POST** /users: Registra um novo usuário. Parâmetros necessários no corpo da requisição:

```json
{
  "name": "teste2",
  "email": "teste2@gmail.com",
  "password": "123123"
}
```
- **POST** /users/auth: Autentica um usuário e retorna um token JWT. Parâmetros necessários no corpo da requisição:

```json
{
  "email": "teste2@gmail.com",
  "password": "123123"
}
```
- **PUT** /users: Edita a senha de um usuário existente que esqueceu suas credenciais. Parâmetros necessários no corpo da requisição:
```json
{
  "email": "teste@gmail.com",
  "newPassword": "teste"
}
```
- **PUT** /users/edit: Edita a senha de um usuário existente autenticado. Parâmetros necessários no corpo da requisição:
```json
{
  "email": "teste@gmail.com",
  "password": "teste"
  "name": "Teste"
}
```
  Implantação em ambiente de produção
Para implantar a API em um ambiente de produção, siga as etapas abaixo:


## **Outras informações**
- Este projeto será refatorado para aderir aos princípios SOLID e será testado utilizando Jest.
