import workerLevels from "core/levels/workerLevels";
import { QRoles } from "types/types";
import { cronTask } from "utils/helpers";
import spawnActions from "core/actions/spawnActions";
import harvester from "roles/harvester";
import upgrader from "roles/upgrader";
import builder from "roles/builder";

const population = {
  getCurrentPop: (): Record<QRoles, number> => {
    const countedPop = _.countBy(Game.creeps, creep => creep.memory.role);
    const totalPop = { ...countedPop };
    Object.keys(QRoles).forEach(role => {
      if (!countedPop.hasOwnProperty(role)) {
        totalPop[role] = 0;
      }
    });

    return totalPop as Record<QRoles, number>;
  },

  getCreepsToSpawn: ({ room }: { room: string }): QRoles[] => {
    const currentPop = population.getCurrentPop();
    console.log("[POPULATION] | ", JSON.stringify(currentPop));
    const neededPop = _.flatten<QRoles>(
      Object.keys(currentPop).map(role => {
        const neededCreeps =
          Memory.rooms[room].config.population.target[role as QRoles] - currentPop[role as QRoles] ?? 0;
        if (neededCreeps > 0) {
          return Array.from(Array(neededCreeps)).fill(role);
        }
        return [];
      })
    );
    return neededPop;
  },

  keepUpdated: ({ room, spawn }: { room: string; spawn: string }) => {
    cronTask(() => {
      const creepsToSpawn = population.getCreepsToSpawn({ room });
      console.log("[POPULATION] | creepsToSpawn: ", creepsToSpawn);
      if (creepsToSpawn.length === 0) return;

      const role = creepsToSpawn[0];

      const energyCap = Game.rooms[room].energyCapacityAvailable;
      const energyAva = Game.rooms[room].energyAvailable;

      const allowedLevels = Object.keys(workerLevels)
        .map(level => parseInt(level, 10))
        .filter(level => level <= energyCap);

      const allowedLevelsMaxItems =
        allowedLevels.length -
        Math.floor(
          Memory.rooms[room].config.population.spawningRetries / Memory.rooms[room].config.population.maxSpawningTries
        );

      const maxLevel =
        allowedLevelsMaxItems <= allowedLevels.length
          ? Math.max(...allowedLevels.slice(0, allowedLevelsMaxItems))
          : allowedLevels[0];

      if (energyAva < maxLevel) {
        Memory.rooms[room].config.population.spawningRetries += 1;
      } else {
        const bodyParts = workerLevels[maxLevel];
        Memory.rooms[room].config.population.spawningRetries = 0;
        spawnActions.spawn({ room, spawn, bodyParts, role: role });
      }
    }, 10);
  },
  forceToWork: () => {
    Object.values(Game.creeps).forEach(creep => {
      if (creep.memory.role === QRoles.HARVESTER) {
        return harvester.run({ creep });
      }
      if (creep.memory.role === QRoles.UPGRADER) {
        return upgrader.run({ creep });
      }
      if (creep.memory.role === QRoles.BUILDER) {
        return builder.run({ creep });
      }
    });
  }
};

export default population;
