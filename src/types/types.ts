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
