export const validateInputName = (value: any) => {
    const isEmptyOrWhitespace = !value.trim();
    const isTooLong = value.length > 50;
    return !(isEmptyOrWhitespace || isTooLong);
  };

  export const validateInputDesc = (value: any) => {
    const isEmptyOrWhitespace = !value.trim();
    const isTooLong = value.length > 200;
    return !(isEmptyOrWhitespace || isTooLong);
  };