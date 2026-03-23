import { generateTableOfContents } from '@/dom/generate-table-of-contents';
import { describe, expect, test } from 'vitest';
import {
  ExpectedTestStringResult,
  TestObjectSourceA,
  TestObjectSourceB,
  TestObjectSourceC,
  TestStringSource,
} from './fixtures/generate-table-of-contents';


describe('generateTableOfContents() [No DOM]', () => {
  test('it generates an ordered list from HTML content headings in a string', () => {
    const result = generateTableOfContents(TestStringSource);

    expect(result.contentSource).to.equal(ExpectedTestStringResult);
    expect(result.tableOfContents).to.have.lengthOf(4);
    expect(result.tableOfContents[0]).to.have.property('text').which.equals('Sub-Heading 1.1');
    expect(result.tableOfContents[0]).to.have.property('slug').which.equals('sub-heading-1-1');
    expect(result.tableOfContents[0]).to.have.property('children').which.has.lengthOf(1);
  });

  test('it generates an ordered list from block editor output', () => {
    const resultA = generateTableOfContents(TestObjectSourceA);

    expect(resultA.tableOfContents).to.have.lengthOf(4);
    expect(resultA.tableOfContents[0]).to.have.property('text').which.equals('Sub-Heading 1.1');
    expect(resultA.tableOfContents[0]).to.have.property('slug').which.equals('sub-heading-1-1');
    expect(resultA.tableOfContents[0]).to.have.property('children').which.has.lengthOf(1);

    const resultB = generateTableOfContents(TestObjectSourceB);

    expect(resultB.tableOfContents).to.have.lengthOf(4);
    expect(resultB.tableOfContents[0]).to.have.property('text').which.equals('Sub-Heading 1.1');
    expect(resultB.tableOfContents[0]).to.have.property('slug').which.equals('sub-heading-1-1');
    expect(resultB.tableOfContents[0]).to.have.property('children').which.has.lengthOf(1);

    const resultC = generateTableOfContents(TestObjectSourceC);

    expect(resultC.tableOfContents).to.have.lengthOf(4);
    expect(resultC.tableOfContents[0]).to.have.property('text').which.equals('Sub-Heading 1.1');
    expect(resultC.tableOfContents[0]).to.have.property('slug').which.equals('sub-heading-1-1');
    expect(resultC.tableOfContents[0]).to.have.property('children').which.has.lengthOf(1);
  });
});
