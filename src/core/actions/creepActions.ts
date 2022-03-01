import { CREEP_ACTIONS, CREEP_STATUS } from "types/types";
import { executeAction } from "./actions";

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
    console.log("next: ", creep.memory.role, next, creep.store.getFreeCapacity());

    if (next && creep.store.getFreeCapacity() === 0) {
      return (creep.memory.status = next);
    }
    const computedTarget = target || Game.getObjectById(creep.memory.sourceId);
    return executeAction({
      creep,
      target: computedTarget,
      action: () => creep.harvest(computedTarget),
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
  },
  upgradeController: ({ creep }: { creep: Creep }) => {
    const controller = Game.rooms[creep.room.name].controller;
    if (!controller) return;

    if (creep.store.getUsedCapacity() === 0) {
      return (creep.memory.status = CREEP_STATUS.IDLE);
    }

    return executeAction({
      creep,
      target: controller,
      action: () => creep.upgradeController(controller),
      onComplete: () => {
        creep.memory.status = CREEP_STATUS.UPGRADING;
      }
    });
  }
};

export default creepActions;
