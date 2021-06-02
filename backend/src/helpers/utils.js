export const pickByNotNullOrUndefined = (object) => {
  const filteredObject = {};
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (value !== undefined && value !== null) filteredObject[key] = value;
  });
  return filteredObject;
};

export default { pickByNotNullOrUndefined };
