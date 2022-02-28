import { QRoles } from "types/types";
import PopulationUtils from "utils/PopulationUtils";

Memory.spawns["S-001"] = {
  config: {
    population: {
      current: PopulationUtils.getInitialPop(),
      target: {
        [QRoles.HARVESTER]: 3,
        [QRoles.UPGRADER]: 4,
        [QRoles.BUILDER]: 2
      }
    }
  }
};
