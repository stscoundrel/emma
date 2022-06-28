/**
 * @jest-environment node
 */

import { local, session } from '../src';

describe('Emma: non-supported environments', () => {
  test('Incorrect environments: does not call localStorage when not available', () => {
    local.setItem('itemThatShouldNotBeThere', 'valueThatWontEndThere');
    local.setItem('anotherItemThatShouldNotBeThere', 'valueThatWontEndThere');

    local.removeItem('anotherItemThatShouldNotBeThere');
    const result = local.getItem('itemThatShouldNotBeThere');
    expect(result).toBeFalsy();

    local.clear();
  });

  test('Incorrect environments: does not call sessionStorage when not available', () => {
    session.setItem('itemThatShouldNotBeThere', 'valueThatWontEndThere');
    session.setItem('anotherItemThatShouldNotBeThere', 'valueThatWontEndThere');

    session.removeItem('anotherItemThatShouldNotBeThere');
    const result = session.getItem('itemThatShouldNotBeThere');
    expect(result).toBeFalsy();

    session.clear();
  });
});
