export const maskOnlyNumbers = (value: string) => {
  let masked = value;
  masked = masked.replace(/[^0-9]/g, '');
  return masked;
};
