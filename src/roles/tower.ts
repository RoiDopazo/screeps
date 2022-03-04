import { repairPriority } from "../core/priority";
const tower = {
  run: ({ room }: { room: string }) => {
    const towers = Game.rooms[room]
      .find(FIND_STRUCTURES)
      .filter(structure => structure.structureType === STRUCTURE_TOWER);

    towers.forEach(tower => {
      const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        (tower as StructureTower).attack(closestHostile);
        return;
      }

      const structures = tower.room
        .find(FIND_STRUCTURES, {
          filter: structure => {
            return (
              (structure.structureType === STRUCTURE_ROAD || structure.structureType === STRUCTURE_RAMPART) &&
              structure.hits < structure.hitsMax
            );
          }
        })
        .sort(repairPriority);

      if ((tower as StructureTower).store.getUsedCapacity(RESOURCE_ENERGY) > 500 && structures && structures.length) {
        (tower as StructureTower).repair(structures[0]);
      }
    });
  }
};

export default tower;
