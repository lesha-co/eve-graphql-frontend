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
    system: async (_source: any, { system_id }: { system_id: string }) => {
      const s: any = await system(system_id);
      return s;
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
    systemConnection: (self: any) => self.system_id,
  },
  EVEPlanetConnection: {
    planet: (self: any) => planet(self.planet_id),
  },
  EVEStargate: {
    destinationSystemConnection: (self: any) => self.destination.system_id,
    destinationStargate: (self: any) => self.destination.stargate_id,
    systemConnection: (self: any) => self.system_id,
  },
  EVEStargateConnection: {
    stargate_id: (id: any) => id,
    stargate: (id: any) => stargate(id),
  },
  EVESystem: {
    security_status_rough: (system: any) => Math.round(system.security_status * 10) / 10,
  },
};
