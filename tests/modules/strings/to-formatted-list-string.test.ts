import { toFormattedListString } from '@/strings/to-formatted-list-string';
import { describe, expect, test } from 'vitest';

describe('strings/toFormattedListString()', () => {
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
