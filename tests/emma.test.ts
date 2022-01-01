import emma, { STORAGE_KEY } from '../src';

describe('Emma test suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Stores & fetches values in localStorage', () => {
    emma.setItem('MyItem', 666);
    const result = emma.getItem('MyItem');

    expect(result).toBe(666);
  });

  test('Does not return expired values', () => {
    const ttl = -123456; // Negative ttl brings date to the past.
    emma.setItem('MyItem1', 666, ttl);

    const result = emma.getItem('MyItem1');

    expect(result).toBeFalsy();
  });

  test('Stores values with prefixed keys & expiration time', () => {
    emma.setItem('MyItemEmmaItem', 666);

    const result = localStorage.getItem(`${STORAGE_KEY}MyItemEmmaItem`);
    const expected = '{"value":666,"expiration":1643756461001}';

    expect(result).toBe(expected);
  });

  test('Removes items based on key', () => {
    const key1 = 'MyItemEmmaItem1';
    const key2 = 'MyItemEmmaItem2';
    const key3 = 'MyItemEmmaItem3';

    emma.setItem(key1, 666);
    emma.setItem(key2, 667);
    emma.setItem(key3, 668);

    emma.removeItem(key1);
    emma.removeItem(key3);

    const result1 = emma.getItem(key1);
    const result2 = emma.getItem(key2);
    const result3 = emma.getItem(key3);

    expect(result1).toBeFalsy();
    expect(result2).toBe(667);
    expect(result3).toBeFalsy();
  });

  test('Clears storage, but only removes Emma-items', () => {
    const key1 = 'MyEmmaItem1';
    const key2 = 'MyEmmaItem2';
    const key3 = 'MyEmmaItem3';

    emma.setItem(key1, 666);
    emma.setItem(key2, 667);
    emma.setItem(key3, 668);

    localStorage.setItem('NormalItem', 'normal value');

    emma.clear();

    const result1 = emma.getItem(key1);
    const result2 = emma.getItem(key2);
    const result3 = emma.getItem(key3);
    const result4 = localStorage.getItem('NormalItem');

    expect(result1).toBeFalsy();
    expect(result2).toBeFalsy();
    expect(result3).toBeFalsy();
    expect(result4).toBe('normal value');
  });
});
