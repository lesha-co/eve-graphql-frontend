import { GraphQLSchema, GraphQLObjectType, Thunk, GraphQLFieldConfigMap } from 'graphql';
import { EVEUnitsResolvers } from '../../backup/sde-frontend/eveUnits';
import { EVEUniverseSystemsResolvers } from '../../backup/esi-frontend/universe/systems';

export type GraphQLFields = Thunk<
  GraphQLFieldConfigMap<
    any,
    any,
    {
      [key: string]: any;
    }
  >
>;

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'EVE',
    fields: {
      ...EVEUnitsResolvers,
      ...EVEUniverseSystemsResolvers,
    },
  }),
});
