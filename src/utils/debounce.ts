import { debounce as _debounce, type DebouncedFunc } from "lodash";

/**
 * Create a debounced function
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced function
 */
export const createDebouncedFunction = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = 500
): DebouncedFunc<T> => {
  return _debounce(func, delay, {
    leading: false,
    trailing: true,
  });
};

/**
 * Debounce hook for React components
 * Can be used directly in components
 */
export const debounce = _debounce;

export default createDebouncedFunction;
