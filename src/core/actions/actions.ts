import { CREEP_STATUS } from "../../types/types";
export const executeAction = ({
  name,
  creep,
  target,
  action,
  onComplete = () => {}
}: {
  name?: string;
  creep: Creep;
  target: any;
  action: () => CreepActionReturnCode | ScreepsReturnCode;
  onComplete?: () => void;
}) => {
  const result = action();
  if (name) console.log("ACTIONS ···· result: ", name, result);
  if (result === ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
    return;
  }

  if (result === OK) {
    onComplete();
    return;
  }
  return;
};

export const hasEnergyToRunAction = ({ creep }: { creep: Creep }) => {
  if (creep.store.getUsedCapacity() === 0) {
    creep.memory.status = CREEP_STATUS.IDLE;
    return false;
  }
  return true;
};
