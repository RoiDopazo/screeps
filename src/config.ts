import { QRoles } from "types/types";

export const room = "W48N55";
export const spawn = "S-001";

Memory.rooms = {};
Memory.rooms[room] = {
  config: {
    population: {
      maxSpawningTries: 5,
      spawningRetries: 0,
      current: {} as any,
      target: {
        [QRoles.HARVESTER]: 3,
        [QRoles.UPGRADER]: 4,
        [QRoles.BUILDER]: 2
      }
    }
  }
};
