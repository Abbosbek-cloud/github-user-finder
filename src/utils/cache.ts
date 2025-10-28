/**
 * Cache utility for storing and retrieving data from localStorage
 */

const CACHE_PREFIX = "github_user_finder_";
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes in milliseconds

interface CacheData<T> {
  data: T;
  timestamp: number;
}

/**
 * Generate cache key with prefix
 */
const getCacheKey = (key: string): string => `${CACHE_PREFIX}${key}`;

/**
 * Save data to localStorage with timestamp
 * @param key - Cache key
 * @param data - Data to cache
 */
export const setCache = <T>(key: string, data: T): void => {
  try {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(getCacheKey(key), JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error setting cache:", error);
  }
};

/**
 * Get data from localStorage if not expired
 * @param key - Cache key
 * @returns Cached data or null if expired/not found
 */
export const getCache = <T>(key: string): T | null => {
  try {
    const cachedItem = localStorage.getItem(getCacheKey(key));

    if (!cachedItem) {
      return null;
    }

    const { data, timestamp }: CacheData<T> = JSON.parse(cachedItem);
    const now = Date.now();

    // Check if cache is expired
    if (now - timestamp > CACHE_EXPIRY) {
      removeCache(key);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error getting cache:", error);
    return null;
  }
};

/**
 * Remove specific item from cache
 * @param key - Cache key
 */
export const removeCache = (key: string): void => {
  try {
    localStorage.removeItem(getCacheKey(key));
  } catch (error) {
    console.error("Error removing cache:", error);
  }
};

/**
 * Clear all app cache
 */
export const clearAllCache = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};

interface CacheStats {
  totalItems: number;
  keys: string[];
}

/**
 * Get cache statistics
 * @returns Cache stats
 */
export const getCacheStats = (): CacheStats => {
  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));

    return {
      totalItems: cacheKeys.length,
      keys: cacheKeys.map((key) => key.replace(CACHE_PREFIX, "")),
    };
  } catch (error) {
    console.error("Error getting cache stats:", error);
    return { totalItems: 0, keys: [] };
  }
};

export default {
  setCache,
  getCache,
  removeCache,
  clearAllCache,
  getCacheStats,
};
