const REPAIR_PRIORITY = [STRUCTURE_ROAD, STRUCTURE_RAMPART, STRUCTURE_WALL];
const TRANSFER_ENERGY_PRIORITY = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER, STRUCTURE_STORAGE];

export const transferEnergyPriority = (a: any, b: any) => {
  if (
    TRANSFER_ENERGY_PRIORITY.findIndex(s => s === a.structureType) <=
    TRANSFER_ENERGY_PRIORITY.findIndex(s => s === b.structureType)
  ) {
    return -1;
  } else {
    return 1;
  }
};

export const repairPriority = (a: any, b: any) => {
  if (a.structureType === b.structureType) {
    if (a.hits < b.hits) {
      return -1;
    } else {
      return 1;
    }
  }

  if (REPAIR_PRIORITY.findIndex(s => s === a.structureType) <= REPAIR_PRIORITY.findIndex(s => s === b.structureType)) {
    return -1;
  } else {
    return 1;
  }
};
