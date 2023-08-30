export const isNullish = (obj: object) => {
  return Object.values(obj).every(value => value === null)
};
