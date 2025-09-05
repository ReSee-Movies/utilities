import { getReseeUtilityConstant, setReseeUtilityConstant } from '@/config';
import { describe, expect, test } from 'vitest';

describe('ReSee Utilities Config', () => {
  test('configuration can be read and written', () => {
    expect(getReseeUtilityConstant('reseeImageBaseUrl')).toEqual('/assets/');
    expect(getReseeUtilityConstant('tmdbImageBaseUrl')).toEqual('https://image.tmdb.org/t/p/');

    setReseeUtilityConstant('reseeImageBaseUrl', '/custom-assets/');
    setReseeUtilityConstant('tmdbImageBaseUrl', 'https://noexist.co/');

    expect(getReseeUtilityConstant('reseeImageBaseUrl')).toEqual('/custom-assets/');
    expect(getReseeUtilityConstant('tmdbImageBaseUrl')).toEqual('https://noexist.co/');

    setReseeUtilityConstant({
      reseeImageBaseUrl : '/other-custom-assets/',
      tmdbImageBaseUrl  : 'https://noexist.tech/media/',
    });

    expect(getReseeUtilityConstant('reseeImageBaseUrl')).toEqual('/other-custom-assets/');
    expect(getReseeUtilityConstant('tmdbImageBaseUrl')).toEqual('https://noexist.tech/media/');
  });
});
