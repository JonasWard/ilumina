/** Replaces `{{name}}` placeholders, the same syntax i18next uses. Shared by pages and islands. */
export const interpolate = (template: string, vars: Record<string, string | number> = {}) =>
  template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match));
