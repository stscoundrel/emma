import { getTime } from 'date-fns';
import { STORAGE_KEY, TTL } from './setup';

const getStorageKey = (key: string): string => STORAGE_KEY + key;

const isAvailable = (): boolean => {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
    return false;
  }

  return true;
};

export const getItem = (key: string) : unknown => {
  if (isAvailable()) {
    const parsedKey = getStorageKey(key);
    const result = sessionStorage.getItem(parsedKey);

    if (result) {
      const parsedResult = JSON.parse(result);
      const currentTime = getTime(new Date());
      if (parsedResult.expiration >= currentTime) {
        return parsedResult.value;
      }

      sessionStorage.removeItem(parsedKey);
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

    sessionStorage.setItem(parsedKey, preparedValue);
  }
};

export const removeItem = (key: string): void => {
  if (isAvailable()) {
    const parsedKey = getStorageKey(key);
    sessionStorage.removeItem(parsedKey);
  }
};

export const clear = (): void => {
  if (isAvailable()) {
    Object.keys(sessionStorage)
      .filter((key) => key.includes(STORAGE_KEY))
      .forEach((emmaKey) => sessionStorage.removeItem(emmaKey));
  }
};

export default {
  getItem,
  removeItem,
  setItem,
  clear,
};
