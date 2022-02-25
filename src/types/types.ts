export enum QRoles {
  HARVESTER = "HARVESTER",
  UPGRADER = "UPGRADER"
}

export type QCreepLevel = Partial<Record<BodyPartConstant, number>>;
