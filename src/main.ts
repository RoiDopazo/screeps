import { ErrorMapper } from "utils/ErrorMapper";
import QCreepController from "./controllers/CreepController";
import "./config";
import { QRoles } from "./types/types";

const UpgraderCtrl = new QCreepController({ room: "S-001", role: QRoles.UPGRADER });
const HarvesterCtrl = new QCreepController({ room: "S-001", role: QRoles.HARVESTER });

export const loop = ErrorMapper.wrapLoop(() => {
  HarvesterCtrl.generateCreeps();
  HarvesterCtrl.work();

  UpgraderCtrl.generateCreeps();
  UpgraderCtrl.work();

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
