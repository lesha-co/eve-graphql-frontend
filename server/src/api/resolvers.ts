import { request } from './request';
const dogmaAttributesURL = () => 'dogma/attributes/';
const dogmaAttributeURL = (attr_id: string) => `dogma/attributes/${attr_id}`;
const dogmaEffectsURL = () => 'dogma/effects/';
const dogmaEffectURL = (effect_id: string) => `dogma/effects/${effect_id}`;

const universeSystemsURL = () => 'universe/systems/';
const universeSystemURL = (system_id: string) => `universe/systems/${system_id}/`;
const universeTypesURL = () => 'universe/types/';
const universeTypeURL = (type_id: string) => `universe/types/${type_id}/`;
const universePlanetURL = (planet_id: string) => `universe/planets/${planet_id}/`;
const universeStargateURL = (stargate_id: string) => `universe/stargates/${stargate_id}/`;
const universeMoonsURL = (moon_id: string) => `universe/moons/${moon_id}/`;

const dogmaEffect = (id: string) => request(dogmaEffectURL(id));
const dogmaAttribute = (id: string) => request(dogmaAttributeURL(id));
const universeSystem = (id: string) => request(universeSystemURL(id));
const universeStargate = (id: string) => request(universeStargateURL(id));
const universePlanet = (id: string) => request(universePlanetURL(id));
const universeType = (id: string) => request(universeTypeURL(id));
const universeMoons = (id: string) => request(universeMoonsURL(id));
export const resolvers = {
  Query: {
    allSystems: async (_source: any, { first }: { first?: number }) => {
      const ids: number[] = await request(universeSystemsURL());
      if (first !== undefined) {
        return ids.slice(0, first);
      }
      return ids;
    },
    system: async (_source: any, { system_id }: { system_id: string }) => {
      const s: any = await universeSystem(system_id);
      return s;
    },

    allUniverseTypes: async (_source: any, { first }: { first?: number }) => {
      const ids: number[] = await request(universeTypesURL());
      if (first !== undefined) {
        return ids.slice(0, first);
      }
      return ids;
    },

    universeType: async (_source: any, { type_id }: { type_id: string }) => {
      const s: any = await universeType(type_id);
      return s;
    },

    allDogmaAttributes: async (_source: any, { first }: { first?: number }) => {
      const ids: number[] = await request(dogmaAttributesURL());
      if (first !== undefined) {
        return ids.slice(0, first);
      }
      return ids;
    },

    dogmaAttribute: async (_source: any, { attribute_id }: { attribute_id: string }) => {
      const s: any = await dogmaAttribute(attribute_id);
      return s;
    },
    allDogmaEffects: async (_source: any, { first }: { first?: number }) => {
      const ids: number[] = await request(dogmaEffectsURL());
      if (first !== undefined) {
        return ids.slice(0, first);
      }
      return ids;
    },

    dogmaEffect: async (_source: any, { effect_id }: { effect_id: string }) => {
      const s: any = await dogmaEffect(effect_id);
      return s;
    },
  },

  EVEDogmaAttributeConnection: {
    attribute_id: (id: any) => id,
    attribute: (id: any) => dogmaAttribute(id),
  },
  EVEDogmaEffectConnection: {
    effect_id: (id: any) => id,
    effect: (id: any) => dogmaEffect(id),
  },
  EVEUniverseTypeDogmaAttributeConnection: {
    attribute: (dogma_attributes_item: any) => dogmaAttribute(dogma_attributes_item.attribute_id),
  },
  EVEUniverseTypeDogmaEffectConnection: {
    effect: (dogma_effects_item: any) => dogmaEffect(dogma_effects_item.effect_id),
  },
  EVESystemConnection: {
    system_id: (id: any) => id,
    system: (id: any) => universeSystem(id),
  },
  EVEPositionXYZ: {
    x: (self: any) => self.x.toString(),
    y: (self: any) => self.y.toString(),
    z: (self: any) => self.z.toString(),
  },
  EVEPlanet: {
    systemConnection: (self: any) => self.system_id,
  },
  EVEPlanetConnection: {
    planet: (self: any) => universePlanet(self.planet_id),
  },
  EVESystemPlanetMoon: {
    moon_id: (id: any) => id,
    moon: (id: any) => universeMoons(id),
  },
  EVEStargate: {
    destinationSystemConnection: (self: any) => self.destination.system_id,
    destinationStargate: (self: any) => self.destination.stargate_id,
    systemConnection: (self: any) => self.system_id,
  },
  EVEStargateConnection: {
    stargate_id: (id: any) => id,
    stargate: (id: any) => universeStargate(id),
  },
  EVESystem: {
    security_status_rough: (system: any) => Math.round(system.security_status * 10) / 10,
  },
};
