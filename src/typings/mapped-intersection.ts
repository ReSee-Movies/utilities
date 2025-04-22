import type { UnionToIntersection } from './union-to-intersection';


/**
 * Given an object, and a string array containing one or more of that object's property
 * names, construct a new type that is the intersection of each property value. This
 * allows for the selective build-up of types for situations like REST APIs with an
 * `include` or similar argument that will furnish extra data in the response.
 *
 * ```ts
 * type Book = {
 *   title: String;
 *   published: string;
 * };
 *
 * type OptionallyIncluded = {
 *   author: {
 *     author: {
 *       name: string;
 *     };
 *   };
 *
 *   translations: {
 *     translations: {
 *       iso: string;
 *     };
 *   };
 * };
 *
 * type Response = Book & MappedIntersection<['author'], OptionallyIncluded>;
 * // => { title: string; published: string } & { author: { name: string; } };
 * ```
 */
export type MappedIntersection<
  A extends readonly string[],
  B extends Record<A[number], unknown>,
> = UnionToIntersection<{ [K in keyof A]: B[A[K]] }[number]>;
