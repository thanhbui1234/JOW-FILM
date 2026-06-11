export { buildBgStyle, buildElementStyle, extractYtId } from "shared-ui";

export function makeId(): string {
  return `cel-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
