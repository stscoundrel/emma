import { getTime } from 'date-fns';

const STORAGE_VERSION = '1.0.0';
export const STORAGE_KEY = `EMMA_${STORAGE_VERSION}_`;

// Default time to live for storage. 24h.
const TTL = 86400000;

const getStorageKey = (key: string): string => STORAGE_KEY + key;

const isAvailable = (): boolean => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return false;
  }

  return true;
};

export const getItem = (key: string) : unknown => {
  if (isAvailable()) {
    const parsedKey = getStorageKey(key);
    const result = localStorage.getItem(parsedKey);

    if (result) {
      const parsedResult = JSON.parse(result);
      const currentTime = getTime(new Date());
      if (parsedResult.expiration >= currentTime) {
        return parsedResult.value;
      }

      localStorage.removeItem(parsedKey);
      return null;
    }

    return result;
  }

  return null;
};

export const setItem = (key: string, value: unknown, ttl = TTL): void => {
  if (isAvailable()) {
    const parsedKey = getStorageKey(key);
    const expiration = (getTime(new Date())) + ttl;
    const preparedValue = JSON.stringify({
      value,
      expiration,
    });

    localStorage.setItem(parsedKey, preparedValue);
  }
};

export const removeItem = (key: string): void => {
  if (isAvailable()) {
    const parsedKey = getStorageKey(key);
    localStorage.removeItem(parsedKey);
  }
};

export const clear = (): void => {
  if (isAvailable()) {
    Object.keys(localStorage)
      .filter((key) => key.includes(STORAGE_KEY))
      .forEach((emmaKey) => localStorage.removeItem(emmaKey));
  }
};

export default {
  getItem,
  removeItem,
  setItem,
  clear,
};
