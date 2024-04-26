export function scalarValidate(
  value: unknown,
  allowedValues?: any[],
  errorMessage?: string,
): string | never {
  if (allowedValues && !allowedValues.includes(String(value))) {
    throw new Error(errorMessage || 'Validation error');
  }

  return String(value);
}
