import gql from 'graphql-tag';

export default gql`
   type User {
      id: Int!
      name: String!
      email: String!
   }
   type Context {
      user: User
   }
   type Auth {
      token: String!
      user: User!
   }
   type Query {
      context: Context
      users: [User!]!
      systemUsers: [User!]!
   }
   type Mutation {
      populate: Boolean
      login(email: String!, password: String!): Auth!
      insertUser(name: String!, email: String!, password: String!): Boolean
   }
`;
