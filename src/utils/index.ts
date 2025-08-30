export function mapStatusValueToCompleted(
  value: TodoStatus,
): boolean | undefined {
  if (value === "complete") return true;
  if (value === "incomplete") return false;
  return undefined;
}
