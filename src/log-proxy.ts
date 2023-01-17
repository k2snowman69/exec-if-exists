const enableLogging = false;

export const debug = out(console.log);

function out<T extends typeof console.log>(func: T) {
  return (...args: Parameters<T>) => {
    if (!enableLogging) {
      return;
    }
    return func(...args);
  };
}
