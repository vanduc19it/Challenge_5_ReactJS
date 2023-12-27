export const validateInputName = (value: string) => {
  const isEmptyOrWhitespace = !value.trim();
  const isTooLong = value.length > 50;
  return !(isEmptyOrWhitespace || isTooLong);
};

export const validateInputDesc = (value: string) => {
  const isEmptyOrWhitespace = !value.trim();
  const isTooLong = value.length > 200;
  return !(isEmptyOrWhitespace || isTooLong);
};
