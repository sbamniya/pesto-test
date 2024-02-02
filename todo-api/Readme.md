# Todo App API

This app has login, signup, todo create, list, update and user list api.

Uses `express` for routing `prisma` for ORM, `postgres` as database.

## local development

```
pnpm install
```

setup your .env file. Follow `.env.example` for reference.

```
pnpm run dev
```

migrate database

```
pnpm run prisma:migrate
```
