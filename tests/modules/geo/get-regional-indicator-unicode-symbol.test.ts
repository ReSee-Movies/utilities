import { getRegionalIndicatorUnicodeSymbol } from '@/geo/get-regional-indicator-unicode-symbol';
import { describe, expect, test } from 'vitest';


describe('geo/getRegionalIndicatorUnicodeSymbol()', () => {
  test('it returns a country flag for the given code', () => {
    // '🇬🇧
    expect(getRegionalIndicatorUnicodeSymbol('uk')).toEqual('🇺🇰');
  });
});
