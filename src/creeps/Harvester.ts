import QCreep from "./Creep";
import { QRoles } from "../types/types";

class QHarvester extends QCreep {
  constructor({ id, room }: { id?: string; room: string }) {
    super({ id: id ? id : "H:" + Game.time, room, role: QRoles.HARVESTER });
  }

  work() {
    var creep = Game.creeps[this.id];

    if (!creep) return this.spawn();

    if (creep.store.getFreeCapacity() > 0) {
      const sources: Source[] = creep.room.find(FIND_SOURCES);

      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    } else {
      if (creep.transfer(Game.spawns[this.room], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns[this.room]);
      }
    }
  }
}

export default QHarvester;
