import express from "express";
import { ApolloServer } from "apollo-server-express";
import { GraphQLModule } from '@graphql-modules/core';
import matches from "./modules/matches";
import positions from "./modules/positions";
import judges from "./modules/judges";
import words from './modules/words';

export async function startServer() {
  const app = express();
  const { schema, context } = new GraphQLModule({
    name: 'app',
    imports: [matches, positions, judges, words],
  });
  const server = new ApolloServer({
    schema,
    context,
  });
  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}