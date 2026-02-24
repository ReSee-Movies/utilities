import { DefaultBaseUrl, getMediaAssetUrl } from '@/resee/get-media-asset-url';
import { describe, expect, test } from 'vitest';


describe('resee/getMediaAssetUrl()', () => {
  test('it will generate a URL to a ReSee image asset', () => {
    const reseeBase    = DefaultBaseUrl;
    const testId       = 'abc-123';
    const testFilename = 'img.png';

    expect(getMediaAssetUrl('')).toEqual('');
    expect(getMediaAssetUrl('  ')).toEqual('');

    expect(getMediaAssetUrl(testId)).toEqual(reseeBase + testId);
    expect(getMediaAssetUrl(testId, testFilename)).toEqual(reseeBase + testId + '/' + testFilename);

    expect(
      getMediaAssetUrl(testId, { download: true, baseUrl: 'https://noexist.co/' }),
    ).toEqual('https://noexist.co/' + testId + '?download=true');

    expect(
      getMediaAssetUrl(testId, testFilename, { download: true, baseUrl: 'https://noexist.co/' }),
    ).toEqual('https://noexist.co/' + testId + '/' + testFilename + '?download=true');

    expect(
      getMediaAssetUrl({ id: testId }),
    ).toEqual(reseeBase + testId);

    expect(
      getMediaAssetUrl({ id: testId, filename_download: testFilename }),
    ).toEqual(reseeBase + testId + '/' + testFilename);

    expect(
      getMediaAssetUrl(
        { id: testId, filename_download: testFilename },
        { download: true, baseUrl: 'https://noexist.co/', width: 200 },
      ),
    ).toEqual('https://noexist.co/' + testId + '/' + testFilename + '?download=true&width=200');
  });
});
