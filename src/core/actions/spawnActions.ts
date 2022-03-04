import { SPAWN_ACTIONS } from "types/types";
import { QCreepBodyParts, QRoles, CREEP_STATUS } from "../../types/types";

const spawnActions: Record<SPAWN_ACTIONS, any> = {
  spawn: ({
    room,
    spawn,
    bodyParts,
    role
  }: {
    room: string;
    spawn: string;
    bodyParts: QCreepBodyParts;
    role: QRoles;
  }) => {
    const _bodyParts = _.flatten(
      Object.keys(bodyParts).map((bodyPart: string) => {
        return Array.from(Array(bodyParts[bodyPart as BodyPartConstant])).fill(bodyPart);
      })
    );

    const sources = Game.rooms[room].find(FIND_SOURCES);

    const returnCode = Game.spawns[spawn].spawnCreep(_bodyParts, role[0] + ":" + Game.time, {
      memory: {
        room: room,
        role: role,
        status: CREEP_STATUS.IDLE,
        sourceId: role === QRoles.HARVESTER ? sources[0].id : sources[1].id
      }
    });

    if (returnCode === OK) {
      Game.rooms[room].visual.text("🛠️" + role, Game.spawns[spawn].pos.x + 1, Game.spawns[spawn].pos.y + 1, {
        align: "left",
        opacity: 0.8
      });
    }
  }
};

export default spawnActions;
