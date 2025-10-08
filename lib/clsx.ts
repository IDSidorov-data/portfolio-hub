export type ClassValue = ClassDictionary | ClassArray | string | number | boolean | null | undefined;

interface ClassDictionary {
  [key: string]: any;
}

interface ClassArray extends Array<ClassValue> {}

function toVal(value: ClassValue): string[] {
  if (!value && value !== 0) {
    return [];
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap(toVal);
  }

  if (typeof value === 'object') {
    return Object.keys(value).filter((key) => {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        return false;
      }
      return Boolean((value as ClassDictionary)[key]);
    });
  }

  return [];
}

export default function clsx(...inputs: ClassValue[]): string {
  return inputs.flatMap(toVal).join(' ');
}
