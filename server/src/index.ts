// import express from 'express';

// // Create Express server
// const app = express();

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log('listening on', PORT);
// });

require('dotenv').config();
import 'graphql-import-node';
import { ApolloServer } from 'apollo-server';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import './configs/mongo-db';
import models, { IModels } from './models';

interface IApolloContext {
  models: IModels;
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: { req: Request; res: Response }): IApolloContext => ({
    models,
  }),
});

// The `listen` method launches a web server.
server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
