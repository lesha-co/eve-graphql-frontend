import graphqlHTTP from "express-graphql";
import express from "express";
import { schema } from "./sde-frontend/schema";

const app = express();
app.use("/graphql", graphqlHTTP({ schema }));
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
