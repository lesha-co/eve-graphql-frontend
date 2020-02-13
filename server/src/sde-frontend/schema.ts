import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { EVEUnitsResolvers } from "./endpoints/eveUnits";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "SDE",
    fields: {
      ...EVEUnitsResolvers
    }
  })
});
