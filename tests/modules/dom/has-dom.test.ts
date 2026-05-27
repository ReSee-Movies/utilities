import { hasDom } from '@/dom/has-dom';
import { describe, expect, test } from 'vitest';


describe('dom/has-dom()', () => {
  test('it detects a Node/Worker environment that does not have a window global', () => {
    expect(hasDom()).toBeFalsy();
  });
});
