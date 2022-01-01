/**
 * @jest-environment node
 */

import emma from '../src';

describe('Emma: non-supported environments', () => {
  test('Incorrect environments: does not call localStorage when not available', () => {
    emma.setItem('itemThatShouldNotBeThere', 'valueThatWontEndThere');
    const result = emma.getItem('itemThatShouldNotBeThere');

    expect(result).toBeFalsy();
  });
});
