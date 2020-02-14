import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import fs from 'fs';
import { resolvers } from './api/resolvers';

const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync('./src/api/schema.graphql', { encoding: 'utf-8' }),
  resolvers,
});

const app = express();
app.use('/graphql', graphqlHTTP({ schema }));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
