import QUpgrader from "creeps/Upgrader";
import { QRoles } from "../types/types";
import QHarvester from "../creeps/Harvester";
import QCreep from "../creeps/Creep";
import QBuilder from "../creeps/Builder";
import { cronTask } from "../utils/helpers";
import levels from "../config/levels";

const numSpawnRetries = 5;

class QCreepController {
  room: string;
  creeps: QUpgrader[] = [];
  role: QRoles;

  constructor({ room, role }: { room: string; role: QRoles }) {
    this.room = room;
    this.role = role;

    for (const i in Game.creeps) {
      if (Game.creeps[i].memory.role === role) {
        this.creeps.push(
          this.newCreepInstance({
            id: Game.creeps[i].name,
            room: this.room
          })
        );
      }
    }
  }

  newCreepInstance({ id, room }: { id?: string; room: string }) {
    if (this.role === QRoles.HARVESTER) return new QHarvester({ id, room });
    if (this.role === QRoles.UPGRADER) return new QUpgrader({ id, room });
    if (this.role === QRoles.BUILDER) return new QBuilder({ id, room });

    throw new Error("Invalid role");
  }

  generateCreeps() {
    const numCreeps = this.creeps.length;
    const targetNumCreeps = Memory.spawns[this.room].config.population.target[this.role];

    if (targetNumCreeps !== undefined && numCreeps !== targetNumCreeps) {
      const creep = this.newCreepInstance({
        room: this.room
      });
      this.creeps.push(creep);
    }
  }

  respawnCreep(creep: QCreep) {
    cronTask(() => {
      const energyCap = Game.spawns[this.room].room.energyCapacityAvailable;
      console.log("energyCap: ", energyCap);
      const energyAva = Game.spawns[this.room].room.energyAvailable;
      console.log("energyAva: ", energyAva);

      const allowedLevels = Object.keys(levels)
        .map(level => parseInt(level, 10))
        .filter(level => level < energyCap);

      const allowedLevelsMaxItems = allowedLevels.length - Math.floor(creep.spawningTries / numSpawnRetries);

      const maxLevel =
        allowedLevelsMaxItems <= allowedLevels.length
          ? Math.max(...allowedLevels.slice(0, allowedLevelsMaxItems))
          : allowedLevels[0];
      console.log("maxLevel: ", maxLevel);

      console.log("energyAva: ", energyAva, "maxLevel ", maxLevel);

      if (energyAva < maxLevel) {
        creep.spawningTries += 1;
        console.log("Next try: ", creep.spawningTries);
      } else {
        creep.bodyParts = levels[maxLevel];
        creep.spawningTries = 0;
        creep.spawn();
      }
    }, 40);
    return;
  }

  work() {
    this.creeps.forEach(creep => {
      if (!Game.creeps[creep.id]) {
        this.respawnCreep(creep);
      }
      creep.work();
    });
  }
}

export default QCreepController;
