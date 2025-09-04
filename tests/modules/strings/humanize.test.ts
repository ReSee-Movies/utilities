import { humanize } from '@/strings/humanize';
import { describe, expect, test } from 'vitest';

describe('strings/humanize()', () => {
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
