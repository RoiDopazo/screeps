import QCreep from "./Creep";
import { QRoles } from "../types/types";

class QHarvester extends QCreep {
  constructor({ id, room }: { id?: string; room: string }) {
    super({ id: id ? id : "H:" + Game.time, room, role: QRoles.HARVESTER, initMem: { working: false } });
  }

  work() {
    var creep = Game.creeps[this.id];

    if (!creep) return;

    if (!creep.memory.working && creep.store.getFreeCapacity() > 0) {
      const sources: Source[] = creep.room.find(FIND_SOURCES);

      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    } else {
      creep.memory.working = true;
      if (creep.store.energy === 0) {
        creep.memory.working = false;
        return;
      }
      const extensions = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        }
      });
      if (extensions.length > 0) {
        if (creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(extensions[0]);
        }
      } else {
        const towers = creep.room.find(FIND_STRUCTURES, {
          filter: structure => {
            return structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
          }
        });

        if (towers.length > 0) {
          if (creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(towers[0]);
          }
        } else {
          creep.moveTo(Game.spawns[this.room]);
        }
      }
    }
  }
}

export default QHarvester;
