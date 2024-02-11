export const isObjectAndContainsProperties = (
  object: unknown,
  ...properties: string[]
): boolean => {
  let isValid = false;
  if (typeof object === "object" && object != null) {
    for (const property of properties) {
      if (property in object) {
        isValid = true;
      } else {
        isValid = false;
      }
    }
  }
  return isValid;
};

export const isFirebaseError = (object: unknown): boolean => {
  return isObjectAndContainsProperties(object, "message", "code");
};
