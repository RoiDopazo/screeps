import { CREEP_STATUS } from "types/types";
import { ErrorMapper } from "utils/ErrorMapper";
import "./config";
import { room, spawn } from "./config";
import population from "./core/population";
import { QRoles } from "./types/types";

// Object.values(Game.creeps).forEach(creep => {
//   const sources = Game.rooms[room].find(FIND_SOURCES);

//   if (creep.memory.role === QRoles.HARVESTER) {
//     console.log(JSON.stringify(creep.memory));
//     creep.memory.status = CREEP_STATUS.IDLE;
//     creep.memory.sourceId = sources[0].id;
//   }
// });

export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  population.keepUpdated({ room, spawn });
  population.forceToWork();
});
