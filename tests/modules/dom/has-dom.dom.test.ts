import { hasDom } from '@/dom/has-dom';
import { describe, expect, test } from 'vitest';


describe('dom/has-dom()', () => {
  test('it detects a browser environment', () => {
    expect(hasDom()).toBeTruthy();
  });
});
