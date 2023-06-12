export function isEmptyString(text: string) {
  return text == null || text.length === 0;
}

export function validateMinLength(text: string, minLength: number) {
  return text != null && text.length >= minLength;
}

export function validateMaxLength(text: string, minLength: number) {
  return text != null && text.length <= minLength;
}

export function validateLength(text: string, length: number) {
  return text != null && text.length === length;
}

export function validateHasNumber(text: string) {
  const hasNumberRegex = /.*[0-9]+.*/g;
  return hasNumberRegex.test(text);
}

export function validateHasCharacter(text: string) {
  const hasCharRegex = /.*[a-zA-Z]+.*/g;
  return hasCharRegex.test(text);
}
