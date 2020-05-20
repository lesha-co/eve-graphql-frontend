import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import fs from 'fs';
import { resolvers } from './api/resolvers';

const typeDefs = [
  './src/api/schema/query.graphql',
  './src/api/schema/connections.graphql',
  './src/api/schema/dogma.graphql',
  './src/api/schema/universe.graphql',
].map((x) => fs.readFileSync(x, { encoding: 'utf-8' }));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use('/graphql', graphqlHTTP({ schema }));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
