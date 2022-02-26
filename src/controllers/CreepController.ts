import QUpgrader from "creeps/Upgrader";
import { QRoles } from "../types/types";
import QHarvester from "../creeps/Harvester";
import QCreep from "../creeps/Creep";
import QBuilder from "../creeps/Builder";
import { cronTask } from "../utils/helpers";

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

  work() {
    this.creeps.forEach(creep => {
      if (!Game.creeps[creep.id]) {
        cronTask(() => {
          // const energyCap = Game.spawns[this.room].room.energyCapacityAvailable;
          // const energyAva = Game.spawns[this.room].room.energyAvailable;

          // const maxLevel = Math.floor((energyCap - QCreep.initialBodyCost) / QCreep.levelUpCost + 1);
          // const targetLevel = maxLevel;
          // console.log("targetLevel: ", targetLevel);

          // console.log(creep.getLevel());
          // while (creep.getLevel() !== 4) {
          //   creep.levelDown();
          // }

          creep.setLevel(4);
          creep.setBodyParts(QCreep.defaultBodyParts);
          console.log(JSON.stringify(creep));

          creep.spawn();
        }, 5);
        return;
      }
      creep.work();
    });
  }
}

export default QCreepController;
