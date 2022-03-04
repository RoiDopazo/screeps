import { CREEP_STATUS } from "types/types";
import creepActions from "core/actions/creepActions";

const builder = {
  run: ({ creep }: { creep: Creep }) => {
    // console.log("BUILDER ···· creep.memory.status: ", creep.memory.status);

    if (creep.memory.status === CREEP_STATUS.IDLE || creep.memory.status === CREEP_STATUS.HARVESTING) {
      creepActions.harvest({ creep, next: CREEP_STATUS.BUILDING });
    }

    if (creep.memory.status === CREEP_STATUS.BUILDING) {
      creepActions.build({ creep });
    }
  }
};

export default builder;
