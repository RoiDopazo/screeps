import { QCreepLevel } from "types/types";

const defaultLevel: QCreepLevel = {
  work: 1,
  carry: 1,
  move: 1
};

abstract class QCreep {
  id: string;
  room: string;
  role: string;
  level: QCreepLevel;

  constructor({
    id,
    room,
    role,
    level = defaultLevel
  }: {
    id: string;
    room: string;
    role: string;
    level?: QCreepLevel;
  }) {
    this.id = id;
    this.room = room;
    this.role = role;
    this.level = level;
  }

  spawn() {
    const returnCode = Game.spawns[this.room].spawnCreep([WORK, WORK, CARRY, MOVE], this.id, {
      memory: { room: this.room, role: this.role, working: false }
    });

    if (returnCode === OK) {
      Game.spawns[this.room].room.visual.text(
        "🛠️" + this.role,
        Game.spawns[this.room].pos.x - 1,
        Game.spawns[this.room].pos.y - 1,
        { align: "left", opacity: 0.8 }
      );
    }
  }
}

export default QCreep;
