export default (callback, ...args) => {
  return () => {
    return callback(...args);
  }
}
