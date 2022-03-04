export enum QRoles {
  HARVESTER = "HARVESTER",
  UPGRADER = "UPGRADER",
  BUILDER = "BUILDER"
}

export type QCreepBodyParts = Partial<Record<BodyPartConstant, number>>;

export enum QBodyPartCost {
  MOVE = 50,
  WORK = 100,
  CARRY = 50
}

export enum CREEP_STATUS {
  IDLE = "IDLE",
  ON_THE_WAY = "ON_THE_WAY",
  WORKING = "WORKING",
  HARVESTING = "HARVESTING",
  TRANSFERRING = "TRANSFERRING",
  UPGRADING = "UPGRADING",
  BUILDING = "BUILDING"
}

export enum CREEP_ACTIONS {
  HARVEST = "harvest",
  TRANSFER = "transfer",
  UPGRADE_CONTROLLER = "upgradeController",
  BUILD = "build"
}

export enum SPAWN_ACTIONS {
  SPAWN = "spawn"
}
