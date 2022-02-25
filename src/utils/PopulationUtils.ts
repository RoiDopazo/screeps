import { QRoles } from "../types/types";

class PopulationUtils {
  getInitialPop() {
    const result = { [QRoles.HARVESTER]: 0, [QRoles.UPGRADER]: 0, [QRoles.BUILDER]: 0 };

    for (const i in Game.creeps) {
      if (Game.creeps[i].memory.role === QRoles.HARVESTER) {
        result[QRoles.HARVESTER] += 1;
      }

      if (Game.creeps[i].memory.role === QRoles.UPGRADER) {
        result[QRoles.UPGRADER] += 1;
      }

      if (Game.creeps[i].memory.role === QRoles.BUILDER) {
        result[QRoles.BUILDER] += 1;
      }
    }

    return result;
  }
}

export default new PopulationUtils();
