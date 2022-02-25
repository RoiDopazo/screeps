import { QCreepBodyParts } from "../types/types";

abstract class QCreep {
  id: string;
  room: string;
  role: string;
  level: number;
  bodyParts: QCreepBodyParts;
  initMem: any;

  static initialBodyCost = 200;
  static levelUpCost = 100;

  static defaultBodyParts: QCreepBodyParts = {
    work: 1,
    carry: 1,
    move: 1
  };

  constructor({ id, room, role, initMem }: { id: string; room: string; role: string; initMem: any }) {
    this.id = id;
    this.room = room;
    this.role = role;
    this.level = 1;
    this.bodyParts = QCreep.defaultBodyParts;
    this.initMem = initMem;
  }

  setLevel(level: number) {
    this.level = level;
  }

  setBodyParts(bodyParts: QCreepBodyParts) {
    this.bodyParts = bodyParts;
  }

  getUpgradeBaseCost() {
    throw new Error("Not implemented");
  }

  getLevel() {
    return this.level;
  }

  spawn() {
    const bodyParts = _.flatten(
      Object.keys(this.bodyParts).map((bodyPart: string) => {
        return Array.from(Array(this.bodyParts[bodyPart as BodyPartConstant])).fill(bodyPart);
      })
    );

    const returnCode = Game.spawns[this.room].spawnCreep(bodyParts, this.id, {
      memory: { room: this.room, role: this.role, ...this.initMem }
    });

    if (returnCode === OK) {
      Game.spawns[this.room].room.visual.text(
        "🛠️" + this.role + "| level " + this.level,
        Game.spawns[this.room].pos.x + 1,
        Game.spawns[this.room].pos.y + 1,
        { align: "left", opacity: 0.8 }
      );
    }
  }
}

export default QCreep;
