import { QCreepBodyParts } from "../types/types";

abstract class QCreep {
  id: string;
  room: string;
  role: string;
  private _bodyParts: QCreepBodyParts;
  private _spawningTries: number;
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
    this._bodyParts = QCreep.defaultBodyParts;
    this.initMem = initMem;
    this._spawningTries = 0;
  }

  set bodyParts(bodyParts: QCreepBodyParts) {
    this._bodyParts = bodyParts;
  }

  get bodyParts() {
    return this._bodyParts;
  }

  abstract work(): void;

  get creep(): Creep {
    return Game.creeps[this.id];
  }

  get spawningTries() {
    return this._spawningTries;
  }

  set spawningTries(spawningTries: number) {
    this._spawningTries = spawningTries;
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
        "🛠️" + this.role,
        Game.spawns[this.room].pos.x + 1,
        Game.spawns[this.room].pos.y + 1,
        { align: "left", opacity: 0.8 }
      );
    }
  }
}

export default QCreep;
