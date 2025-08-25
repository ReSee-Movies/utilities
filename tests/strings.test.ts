import { describe, expect, test } from 'vitest';
import { deslugify } from '../src/strings/deslugify';
import { humanize } from '../src/strings/humanize';
import { isString } from '../src/strings/is-string';
import { isUUID } from '../src/strings/is-uuid';
import { slugify } from '../src/strings/slugify';
import { toFormattedListString } from '../src/strings/to-formatted-list-string';
import { toTitleCase } from '../src/strings/to-title-case';


describe('isString()', () => {
  test('it correctly identifies a string', () => {
    expect(isString('Hello World')).toBe(true);
    expect(isString('')).toBe(true);
  });
});


// describe('deslugify()', () => {
//   test('it returns the numeric prefix of a string', () => {
//     expect(deslugify('123-foo-bar')).toEqual(123);
//     expect(deslugify('foo-bar')).toEqual(-1);
//     expect(deslugify(false)).toEqual(-1);
//   });
// });
//
//
// describe('slugify()', () => {
//   test('it will turn a string into a URL safe slug', () => {
//     expect(slugify('to error isQuite Human')).toEqual('to-error-isquite-human');
//   });
// });


describe('isUUID()', () => {
  test('it correctly identifies a v4 UUID', () => {
    expect(isUUID('abcd1234-ab12-4ab1-8abc-abcdef123456')).toBe(true);
    expect(isUUID('abcd1234-ab12-4ab1-9abc-abcdef123456')).toBe(true);
    expect(isUUID('abcd1234-ab12-4ab1-Aabc-abcdef123456')).toBe(true);
    expect(isUUID('abcd1234-ab12-4ab1-Babc-abcdef123456')).toBe(true);
    expect(isUUID('abcd1234-ab12-5ab1-8abc-abcdef123456')).toBe(false);
    expect(isUUID('')).toBe(false);
    expect(isUUID(10)).toBe(false);
  });
});


describe('toFormattedListString()', () => {
  test('it turns an array of strings into a single human-friendly string', () => {
    expect(
      toFormattedListString(['apples', 'bread', 'sugar', 'tofu']),
    ).toEqual('apples, bread, sugar and tofu');

    expect(
      toFormattedListString(['apples', 'bread', 'sugar', 'tofu'], {
        prefix            : '<',
        suffix            : '>',
        separator         : ' | ',
        lastItemSeparator : ' || ',
      }),
    ).toEqual('<apples> | <bread> | <sugar> || <tofu>');

    expect(
      toFormattedListString(['apples'], {
        prefix            : '<',
        suffix            : '>',
        separator         : ' | ',
        lastItemSeparator : ' || ',
      }),
    ).toEqual('<apples>');
  });
});


describe('toTitleCase()', () => {
  test('it will Title Case the words in a string', () => {
    expect(toTitleCase('the quick brown fox')).toEqual('The quick brown fox');
    expect(toTitleCase('the quick brown fox', false)).toEqual('The Quick Brown Fox');
  });
});


describe('humanize()', () => {
  test('it will split a string on the expected characters', () => {
    expect(humanize('foobarbaz')).toEqual('Foobarbaz');
    expect(humanize('fooBarBaz')).toEqual('Foo Bar Baz');
    expect(humanize('FooBarBaz')).toEqual('Foo Bar Baz');
    expect(humanize('FOOBarBaz')).toEqual('FOO Bar Baz');
    expect(humanize('fooBARBaz')).toEqual('Foo BAR Baz');
    expect(humanize('foo-bar-baz')).toEqual('Foo Bar Baz');
    expect(humanize('foo-Bar-Baz')).toEqual('Foo Bar Baz');
    expect(humanize('foo_bar_baz')).toEqual('Foo Bar Baz');
    expect(humanize('foo_Bar_Baz')).toEqual('Foo Bar Baz');
  });
});
