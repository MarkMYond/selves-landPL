/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any): boolean {
    return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param target
 * @param sources
 */
export default function deepMerge<T extends object = object, R extends object = object>(
  target: T,
  ...sources: R[]
): T & R {
  sources.forEach(source => {
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        const targetValue = target[key as keyof T];
        const sourceValue = source[key as keyof R];

        if (isObject(targetValue) && isObject(sourceValue)) {
          // @ts-ignore // Ignore complex recursive type inference
          deepMerge(targetValue, sourceValue);
        } else {
          // @ts-ignore // Allow assignment even if types don't perfectly match
          target[key as keyof T] = sourceValue;
        }
      });
    }
  });

  return target as T & R;
}
