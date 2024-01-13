# Bun + GQL + Drizzle + Multitenancy

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

or

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Details

Run the mutation populate to create database to show the multitenancy in action.

```graphql
mutation {
   populate
}
```

Table `users` and `users_1` will be created.

Run the query `users` to see the data in the table `users` that are stored for an specific tentat.

```graphql
query {
   users {
      id
      name
      email
   }
}
```
