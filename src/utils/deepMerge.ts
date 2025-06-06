export function isObject(item: any): boolean {
    return item && typeof item === 'object' && !Array.isArray(item);
}

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
          deepMerge(targetValue as object, sourceValue as object);
        } else {
          target[key as keyof T] = sourceValue as any;
        }
      });
    }
  });

  return target as T & R;
}
