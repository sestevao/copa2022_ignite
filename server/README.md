<h1 align="center">
  <img alt="CupPoll2022" title="DATABASE_URL=file:./dev.db" src="Web.png" width="700px" />
</h1>

## :rocket: Technologies

- [Node.js](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io/docs/latest/Guides/Getting-Started/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://www.npmjs.com/package/zod)
- [ShorUniqueID](https://www.npmjs.com/package/short-unique-id)
- [Diagrama ERD](https://www.npmjs.com/package/prisma-erd-generator/)
- [Mermaid-js](https://mermaid-js.github.io/mermaid/#/)
- [Country Codes](https://countrycode.org/)

## 🚀 How to run

- Install the packages with `npm install`.
- Copy the `.env.example` file to `.env` and change it if necessary.
- Run `npx prisma migrate dev` to run the migrations. (This command will also run the seeds)
- Run `npm run dev` to start the server.

## 📝 Notes

```bash
$ npm init -y
$ npm i typescript -D
$ npx tsc --init
$ npm i fastify
$ npm i tsx -D
$ npm i prisma -D
$ npm i @prisma/client
$ npx prisma init --datasource-provider SQLite
$ npx prisma migrate dev
  - create table pools
$ npx prisma studio

## DIAGRAM
$ npm i prisma-erd-generator @mermaid-js/mermaid-cli -D
$ npx prisma generate

$ npm i @fastify/cors
$ npm i @types/fastify-jwt

# API -> countrycode.org (https://countrycode.org/)

$ create db structure
$ npx prisma db seed

$ npm i zod
$ npm i short-unique-id
$ npm install node-fetch
```
