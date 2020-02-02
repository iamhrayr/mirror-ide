// import express from 'express';

// // Create Express server
// const app = express();

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log('listening on', PORT);
// });

import 'graphql-import-node';
import { ApolloServer } from 'apollo-server';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
