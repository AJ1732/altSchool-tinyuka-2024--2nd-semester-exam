export function mapStatusValueToCompleted(value) {
  if (value === "complete") return true;
  if (value === "incomplete") return false;
  return undefined;
}
