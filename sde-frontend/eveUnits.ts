import { SDELoad } from './yamlLoad';
import { GraphQLList } from 'graphql';
import { GraphQLFields } from '../../schema';
import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

const EVEUnit = new GraphQLObjectType({
  name: 'Unit',
  description: 'EVE in-game units.',
  fields: () => ({
    unitID: {
      type: GraphQLID,
    },
    unitName: {
      type: GraphQLString,
      description: 'Unit name, usually describing measure (e.g. Length).',
    },
    displayName: {
      type: GraphQLString,
      description: 'Displayed name of unit, usually an abbreviation (e.g. m).',
    },
    description: {
      type: GraphQLString,
      description: 'Unit description, usually the full unit name (e.g. Meter).',
    },
  }),
});

type TEVEUnit = {
  unitID: number;
  unitName?: string;
  displayName?: string;
  description?: string;
};

export const EVEUnitsResolvers: GraphQLFields = {
  allUnits: {
    type: GraphQLList(EVEUnit),
    description: 'All EVE in-game units',
    resolve: (_source) => EVEUnits,
  },
  Unit: {
    args: {
      unitID: {
        type: GraphQLID,
      },
      description: {
        type: GraphQLString,
      },
      unitName: {
        type: GraphQLString,
      },
      displayName: {
        type: GraphQLString,
      },
    },
    type: GraphQLList(EVEUnit),
    resolve: (_source, { unitID, description, unitName, displayName }) => {
      return EVEUnits.filter((unit) => {
        if (unitID === undefined) return true;
        return unit.unitID === parseInt(unitID, 10);
      })
        .filter((unit) => {
          if (description === undefined) return true;
          return unit.description?.includes(description);
        })
        .filter((unit) => {
          if (displayName === undefined) return true;
          return unit.displayName?.includes(displayName);
        })
        .filter((unit) => {
          if (unitName === undefined) return true;
          return unit.unitName?.includes(unitName);
        });
    },
  },
};

export const EVEUnits: TEVEUnit[] = SDELoad('bsd/eveUnits.yaml');
