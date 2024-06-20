import { describe, expect, it } from '@jest/globals';
import { User, isAdult } from "../src/app";

describe('IsAdult', () => {
  it('Should be adult when age is 16.', () => {
    const user: User = {
      name: 'kimley',
      age: 26
    };

    expect(isAdult(user)).toBeTruthy();
  });
});
