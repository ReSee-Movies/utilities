import { areDatesEqual } from '@/dates/are-dates-equal';
import { describe, expect, test } from 'vitest';

describe('dates/areDatesEqual()', () => {
  test('it correctly identifies two dates that are the same year', () => {
    const dateA = new Date('1980-01-01T00:00:00Z');
    const dateB = new Date('1980-02-10T12:00:00Z');
    const dateC = new Date('1981-03-20T23:59:00Z');

    expect(areDatesEqual(dateA, dateB, 'year'), 'same year').to.equal(true);
    expect(areDatesEqual(dateA, dateC, 'year'), 'different year').to.equal(false);
  });

  test('it correctly identifies two dates that are the same month', () => {
    const dateA = new Date('1980-01-01T00:00:00Z');
    const dateB = new Date('1980-01-20T00:00:00Z');
    const dateC = new Date('1980-02-20T00:00:00Z');
    const dateD = new Date('1981-01-20T00:00:00Z');

    expect(areDatesEqual(dateA, dateB, 'month'), 'same year and month').to.equal(true);
    expect(areDatesEqual(dateA, dateC, 'month'), 'same year, different month').to.equal(false);
    expect(areDatesEqual(dateA, dateD, 'month'), 'different year and month').to.equal(false);
  });

  test('it correctly identifies two dates that are the same day', () => {
    const dateA = new Date('1980-01-01T00:00:00Z');
    const dateB = new Date('1980-01-01T23:00:00Z');
    const dateC = new Date('1980-02-01T23:00:00Z');
    const dateD = new Date('1981-01-01T23:00:00Z');
    const dateE = new Date('1981-02-01T23:00:00Z');
    const dateF = new Date('1981-02-02T23:00:00Z');

    expect(areDatesEqual(dateA, dateB, 'day'), 'same year, month and day').to.equal(true);
    expect(areDatesEqual(dateA, dateC, 'day'), 'same year and day, different month').to.equal(false);
    expect(areDatesEqual(dateA, dateD, 'day'), 'same month and day, different year').to.equal(false);
    expect(areDatesEqual(dateA, dateE, 'day'), 'same day, different year and month').to.equal(false);
    expect(areDatesEqual(dateA, dateF, 'day'), 'different year, month and day').to.equal(false);
  });
});
