const funcToLevel = new Map();
// funcToLevel.set(console.trace, 10);
funcToLevel.set(console.debug, 20);
// funcToLevel.set(console.info, 30);
// funcToLevel.set(console.warn, 40);
funcToLevel.set(console.log, 50);
funcToLevel.set(console.error, 60);

const currentLogLevel = funcToLevel.get(console.log);

export const log = out(console.log);
export const debug = out(console.debug);

function out<T extends typeof console.log>(func: T) {
  const levelForFunc = funcToLevel.get(func);
  return (...args: Parameters<T>) => {
    if (levelForFunc < currentLogLevel) {
      return;
    }
    return func(...args);
  };
}
