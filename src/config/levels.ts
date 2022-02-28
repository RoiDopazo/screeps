import { QCreepBodyParts } from "../types/types";

export const WorkerLevel_1: QCreepBodyParts = {
  work: 1,
  carry: 1,
  move: 1
};

export const WorkerLevel_2: QCreepBodyParts = {
  work: 2,
  carry: 2,
  move: 2
};

export const WorkerLevel_3: QCreepBodyParts = {
  work: 3,
  carry: 3,
  move: 3
};

export const WorkerLevel_4: QCreepBodyParts = {
  work: 4,
  carry: 4,
  move: 4
};

export const WorkerLevel_5: QCreepBodyParts = {
  work: 5,
  carry: 5,
  move: 5
};

const levels: Record<number, QCreepBodyParts> = {
  200: WorkerLevel_1,
  400: WorkerLevel_2,
  600: WorkerLevel_3,
  800: WorkerLevel_4,
  1000: WorkerLevel_5
};

export default levels;
