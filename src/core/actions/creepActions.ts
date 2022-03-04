import { CREEP_ACTIONS, CREEP_STATUS } from "types/types";
import { executeAction, hasEnergyToRunAction } from "./actions";
import { transferEnergyPriority } from "../priority";

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
    const structures = creep.room
      .find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            ((structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_STORAGE) &&
              structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) ||
            (structure.structureType === STRUCTURE_TOWER && structure.store.getUsedCapacity(RESOURCE_ENERGY) <= 500)
          );
        }
      })
      .sort(transferEnergyPriority);

    if (!structures || structures.length === 0) return;

    if (!hasEnergyToRunAction({ creep })) return;

    return executeAction({
      creep,
      target: structures[0],
      action: () => creep.transfer(structures[0], resourceType),
      onComplete: () => {
        creep.memory.status = CREEP_STATUS.TRANSFERRING;
      }
    });
  },
  upgradeController: ({ creep }: { creep: Creep }) => {
    const controller = Game.rooms[creep.room.name].controller;
    if (!controller) return;
    if (!hasEnergyToRunAction({ creep })) return;

    return executeAction({
      creep,
      target: controller,
      action: () => creep.upgradeController(controller),
      onComplete: () => {
        creep.memory.status = CREEP_STATUS.UPGRADING;
      }
    });
  },
  build: ({ creep }: { creep: Creep }) => {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

    if (!hasEnergyToRunAction({ creep })) return;

    if (targets.length) {
      return executeAction({
        creep,
        target: targets[0],
        action: () => creep.build(targets[0])
      });
    }
  }
};

export default creepActions;
