import creepActions from "core/actions/creepActions";
import { CREEP_STATUS } from "types/types";

const harvester = {
  run: ({ creep }: { creep: Creep }) => {
    // console.log("HARVESTER ···· creep.memory.status: ", creep.memory.status);

    if (creep.memory.status === CREEP_STATUS.IDLE || creep.memory.status === CREEP_STATUS.HARVESTING) {
      creepActions.harvest({ creep, next: CREEP_STATUS.TRANSFERRING });
    }

    if (creep.memory.status === CREEP_STATUS.TRANSFERRING) {
      creepActions.transfer({ creep });
    }
  }
};

export default harvester;
