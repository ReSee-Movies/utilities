import {
  ImageFileDescriptor,
  NormalizedFileDescriptor,
  normalizeImageFileDescriptor,
} from './normalize-image-file-descriptor';


export type PossibleImageFileDescriptor
  = ImageFileDescriptor
    | null
    | undefined
    | [
      descriptor   : ImageFileDescriptor | null | undefined,
      extraDetails : Partial<NormalizedFileDescriptor>,
    ];


/**
 * Takes an array of image file descriptors, and returns a normalized version
 * of the first one with a usable identifier. This is useful in scenarios where
 * one or more fallback images are desired, if no primary has been made available.
 */
export function getFirstAvailableImageFileDescriptor(
  descriptors: PossibleImageFileDescriptor[],
) {
  for (const descriptor of descriptors) {
    const result = normalizeImageFileDescriptor(
      Array.isArray(descriptor) ? descriptor[0] : descriptor,
    );

    if (result.identifier) {
      if (Array.isArray(descriptor) && descriptor.length > 1) {
        Object.assign(result, descriptor[1]);
      }

      return result;
    }
  }

  return normalizeImageFileDescriptor(undefined);
}
