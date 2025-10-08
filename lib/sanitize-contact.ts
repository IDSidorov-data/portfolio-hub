const replacements: Array<[RegExp, string]> = [
  [/Телеграм-боты/gi, 'Чат-боты'],
  [/Телеграм/gi, 'мессенджеры'],
  [/Telegram/gi, 'мессенджеры'],
  [/TG WebApp/gi, 'WebApp'],
  [/t\.me/gi, ''],
];

export function sanitizeContactText(value: string): string {
  return replacements.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), value);
}
