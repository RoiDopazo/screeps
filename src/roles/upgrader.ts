import creepActions from "core/actions/creepActions";
import { CREEP_STATUS } from "types/types";

const upgrader = {
  run: ({ creep }: { creep: Creep }) => {
    // console.log("UPGRADER ···· creep.memory.status: ", creep.memory.status);

    if (creep.memory.status === CREEP_STATUS.IDLE || creep.memory.status === CREEP_STATUS.HARVESTING) {
      creepActions.harvest({ creep, next: CREEP_STATUS.UPGRADING });
    }

    if (creep.memory.status === CREEP_STATUS.UPGRADING) {
      creepActions.upgradeController({ creep });
    }
  }
};

export default upgrader;
