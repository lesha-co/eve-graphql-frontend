import { request } from './request';
const systemsURI = () => 'universe/systems/';
const systemURI = (system_id: string) => `universe/systems/${system_id}/`;
const planetURL = (planet_id: string) => `universe/planets/${planet_id}/`;
const stargateURL = (stargate_id: string) => `universe/stargates/${stargate_id}/`;

const system = (id: string) => request(systemURI(id));
const stargate = (id: string) => request(stargateURL(id));
const planet = (id: string) => request(planetURL(id));
export const resolvers = {
  Query: {
    allSystems: async (_source: any, { first }: { first?: number }) => {
      const ids: number[] = await request(systemsURI());
      if (first !== undefined) {
        return ids.slice(0, first);
      }
      return ids;
    },
    system: (_source: any, { system_id }: { system_id: string }) => {
      return system(system_id);
    },
  },
  EVESystemConnection: {
    system_id: (id: any) => id,
    system: (id: any) => system(id),
  },
  EVEPositionXYZ: {
    x: (self: any) => self.x.toString(),
    y: (self: any) => self.y.toString(),
    z: (self: any) => self.z.toString(),
  },
  EVEPlanet: {
    system: (self: any) => system(self.system_id), // todo
  },
  EVESystemPlanet: {
    planet: (self: any) => planet(self.planet_id),
  },
  EVEStargate: {
    destination_system: (self: any) => system(self.destination.system_id),
    destination_stargate: (self: any) => stargate(self.destination.stargate_id),
    system: (self: any) => system(self.system_id),
  },
  EVESystemStargate: {
    stargate_id: (id: any) => id,
    stargate: (id: any) => stargate(id),
  },
  EVESystem: {
    security_status_rough: (system: any) => Math.round(system.security_status * 10) / 10,
  },
};
