import tower from "roles/tower";
import { ErrorMapper } from "utils/ErrorMapper";
import "./config";
import { room, spawn } from "./config";
import population from "./core/population";

export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  population.keepUpdated({ room, spawn });
  population.forceToWork();

  tower.run({ room });
});
