import QUpgrader from "creeps/Upgrader";
import { QRoles } from "../types/types";
import QHarvester from "../creeps/Harvester";

class QCreepController {
  room: string;
  upgraders: QUpgrader[] = [];
  role: QRoles;

  constructor({ room, role }: { room: string; role: QRoles }) {
    this.room = room;
    this.role = role;

    for (const i in Game.creeps) {
      if (Game.creeps[i].memory.role === role) {
        this.upgraders.push(
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

    throw new Error("Invalid role");
  }

  generateCreeps() {
    const numCreeps = this.upgraders.length;
    const targetNumCreeps = Memory.spawns[this.room].config.population.target[this.role];

    if (numCreeps !== targetNumCreeps) {
      const upgraderCreep = this.newCreepInstance({
        room: this.room
      });
      this.upgraders.push(upgraderCreep);
    }
  }

  work() {
    this.upgraders.forEach(upgraderCreep => {
      if (!Game.creeps[upgraderCreep.id]) {
        upgraderCreep.spawn();
      }
      upgraderCreep.work();
    });
  }
}

export default QCreepController;
