import { generateTableOfContents } from '@/dom/generate-table-of-contents';
import { describe, expect, test } from 'vitest';
import {
  ExpectedTestStringResult,
  MakeHeadingElement,
  TestElementSource,
  TestObjectSourceA,
  TestObjectSourceB,
  TestObjectSourceC,
  TestStringSource,
} from './fixtures/generate-table-of-contents';


describe('generateTableOfContents() [With DOM]', () => {
  test('it generates an ordered list from HTML content headings in a string', () => {
    const result = generateTableOfContents(TestStringSource);

    expect(result.contentSource).to.equal(ExpectedTestStringResult);
    expect(result.tableOfContents).to.have.lengthOf(4);
    expect(result.tableOfContents[0]).to.have.property('text').which.equals('Sub-Heading 1.1');
    expect(result.tableOfContents[0]).to.have.property('slug').which.equals('sub-heading-1-1');
    expect(result.tableOfContents[0]).to.have.property('children').which.has.lengthOf(1);
  });


  test('it generates an ordered list from HTML Elements', () => {
    const result = generateTableOfContents(TestElementSource());

    expect(result.contentSource.outerHTML).to.equal(ExpectedTestStringResult.replaceAll(/[\n\r]\s+/g, ''));
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

    expect(resultC.contentMap).toBeInstanceOf(WeakMap);
    expect(resultC.contentMap?.get(TestObjectSourceC[1])?.slug).to.equal('sub-heading-1-1');
  });


  test('it gracefully exist when disabled or fed bad inputs', () => {
    expect(
      // @ts-expect-error - purposefully providing bad data
      generateTableOfContents(123),
    ).to.have.property('tableOfContents').with.lengthOf(0);

    expect(
      generateTableOfContents(TestStringSource, { enabled: false }),
    ).to.have.property('tableOfContents').with.lengthOf(0);
  });


  test('it gracefully deals with headings that lack text content', () => {
    expect(
      generateTableOfContents('<div><h2></h2></div>').tableOfContents[0].slug,
    ).to.be.a('string').with.a.lengthOf(10);

    const container = document.createElement('div');

    container.append(
      MakeHeadingElement(2, ''),
    );

    expect(
      generateTableOfContents(container).tableOfContents[0].slug,
    ).to.be.a('string').with.a.lengthOf(10);

    expect(
      generateTableOfContents([
        { type: 'heading', data: { content: '', level: 2 } },
      ]).tableOfContents[0].slug,
    ).to.be.a('string').with.a.lengthOf(10);

    expect(
      generateTableOfContents([
        { type: 'header', data: { text: '', level: 2 } },
      ]).tableOfContents[0].slug,
    ).to.be.a('string').with.a.lengthOf(10);

    expect(
      generateTableOfContents([
        { type: 'header', attrs: { level: 2 }, content: [{ type: 'text', text: '' }] },
      ]).tableOfContents[0].slug,
    ).to.be.a('string').with.a.lengthOf(10);
  });
});
