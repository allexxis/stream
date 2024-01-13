# Bun + GQL + Drizzle + Multitenancy

This project is a sample of how to use [Bun](https://bun.sh) with [GraphQL](https://graphql.org/) and [Drizzle](https://orm.drizzle.team/) with multitenancy using included sqllite module on bun.

The idea is to show how to use the same table for multiple tenants, in this case we are using the table `users` for multiple tenants, the table `users` will be created for each tenant with the name `users_{tenantId}`.

So let's say we have 2 tenants with ids `1` and `2`, the table `users` will be created as `users_1` and `users_2` and the data will be stored in the correct table based on the tenant id.

So users from each client will be totally isolated from each other.

## Configuration

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

## Test the project

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
