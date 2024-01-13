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

Run the query `systemUsers` to see the data in the table `users` withou tentat.

```graphql
query {
   systemUsers {
      id
      name
      email
   }
}
```

To insert a user to an specific tentat, run the mutation `inserUser` tenant id will be extracted from context so make sure you add the dummy token to the headers.

```graphql
mutation {
   insertUser(name: "John Doe", email: "john@email.com", password: "123") {
      id
      name
      email
   }
}
```
