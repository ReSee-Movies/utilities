/**
 * A selective `Partial` utility type. Construct a type with the properties of T,
 * and whose keys K are optional.
 */
export type Optional<T, K extends keyof T & (string | number | symbol)> = Omit<T, K> & Partial<Pick<T, K>>;
