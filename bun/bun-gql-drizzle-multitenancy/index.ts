import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import schemas from './src/schemas';
import modules from '@modules/index';
import context from '@lib/context';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as config from '@config';
const server = new ApolloServer<any>({
   typeDefs: schemas,
   resolvers: modules,
});

await startStandaloneServer(server, {
   listen: { port: config.server.PORT },
   context: async ({ req, res }) => {
      const ctx = await context(req as any, res as any);
      return ctx;
   },
});
console.log(
   `🚀 Server ready at http://localhost:${config.server.PORT}/graphql`
);
