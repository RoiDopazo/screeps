export const executeAction = ({
  creep,
  target,
  action,
  onComplete = () => {}
}: {
  creep: Creep;
  target: any;
  action: () => CreepActionReturnCode | ScreepsReturnCode;
  onComplete?: () => void;
}) => {
  const result = action();
  console.log("ACTIONS ···· result: ", result);
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
