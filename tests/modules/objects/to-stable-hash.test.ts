import { toStableHash } from '#objects/to-stable-hash.js';
import { describe, expect, test } from 'vitest';


describe('objects/toStableHash()', () => {
  test('it creates a reproducible hash for a wide variety of inputs', () => {
    expect(toStableHash('Hello World')).toEqual('"Hello World"');
    expect(toStableHash(12345)).toEqual('12345');
    expect(toStableHash(true)).toEqual('true');
    expect(toStableHash(null)).toEqual('null');
    expect(toStableHash(undefined)).toEqual('undefined');

    expect(
      toStableHash(new Date(Date.UTC(1990, 6, 10, 12, 30, 0))),
    ).toEqual('1990-07-10T12:30:00.000Z');

    expect(toStableHash(Symbol('symbol description'))).toEqual('Symbol(symbol description)');

    expect(toStableHash(/[a-zA-Z]/)).toEqual('/[a-zA-Z]/');

    expect(
      toStableHash({ c: [1, 2, 3], a: { foo: 'bar', baz: true }, b: new Map() }),
    ).toEqual('#a:#baz:true,foo:"bar",,b:3~,c:@1,2,3,,');

    expect(toStableHash('Hello World', true)).toEqual('0gq4scu05j42g5');
  });
});
