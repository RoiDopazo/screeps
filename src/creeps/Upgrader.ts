import QCreep from "./Creep";
import { QRoles } from "../types/types";

class QUpgrader extends QCreep {
  constructor({ id, room }: { id?: string; room: string }) {
    super({ id: id ? id : "U:" + Game.time, room, role: QRoles.UPGRADER, initMem: { working: false } });
  }

  work() {
    const creep = Game.creeps[this.id];

    if (!creep) return;

    if (!creep.memory.working && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1]);
      }
    } else {
      if (creep.room.controller) {
        const returnCode = creep.upgradeController(creep.room.controller);

        if (returnCode === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }

        if (returnCode === OK) {
          creep.memory.working = true;
        }
        if (returnCode === ERR_NOT_ENOUGH_RESOURCES) {
          creep.memory.working = false;
        }
      }
    }
  }
}

export default QUpgrader;
