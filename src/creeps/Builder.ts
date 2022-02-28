import QCreep from "./Creep";
import { QRoles } from "../types/types";

class QBuilder extends QCreep {
  constructor({ id, room }: { id?: string; room: string }) {
    super({ id: id ? id : "B:" + Game.time, room, role: QRoles.BUILDER, initMem: { building: false } });
  }

  work() {
    const creep = Game.creeps[this.id];

    if (!creep) return;

    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say("🚧 build");
    }

    if (creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
}

export default QBuilder;
