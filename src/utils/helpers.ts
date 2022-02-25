export function cronTask(callback: any, ticks: number) {
  if (Game.time % ticks === 0) {
    return callback();
  }
}
