import { QCreepBodyParts, QRoles, CREEP_ACTIONS, SPAWN_ACTIONS, CREEP_STATUS } from "types/types";

const executeAction = ({
  creep,
  target,
  action,
  onComplete = () => {}
}: {
  creep: Creep;
  target: any;
  action: () => CreepActionReturnCode | ScreepsReturnCode;
  onComplete?: () => void;
}) => {
  const result = action();
  console.log("ACTIONS ···· result: ", result);
  if (result === ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
    return;
  }

  if (result === OK) {
    onComplete();
    return;
  }
  return;
};

const creepActions: Record<CREEP_ACTIONS, any> = {
  harvest: ({
    creep,
    target,
    next
  }: {
    creep: Creep;
    target: Source | Mineral<MineralConstant> | Deposit;
    next: CREEP_STATUS;
  }) => {
    if (creep.store.getFreeCapacity() === 0) {
      return (creep.memory.status = next);
    }
    return executeAction({
      creep,
      target,
      action: () => creep.harvest(target),
      onComplete: () => (creep.memory.status = CREEP_STATUS.HARVESTING)
    });
  },
  transfer: ({ creep, resourceType = RESOURCE_ENERGY }: { creep: Creep; resourceType: ResourceConstant }) => {
    const structures = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      }
    });
    if (!structures || structures.length === 0) return;

    return executeAction({
      creep,
      target: structures[0],
      action: () => creep.transfer(structures[0], resourceType),
      onComplete: () => {
        creep.memory.status = creep.store.getUsedCapacity() > 0 ? CREEP_STATUS.TRANSFERRING : CREEP_STATUS.IDLE;
      }
    });
  }
};

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
        sourceId: role === QRoles.UPGRADER ? sources[1].id : sources[0].id
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

export { creepActions, spawnActions };
