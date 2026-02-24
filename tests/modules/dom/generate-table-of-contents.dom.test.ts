import { generateTableOfContents, TableOfContentsObjectSource } from '#dom/generate-table-of-contents.js';
import { describe, expect, test } from 'vitest';

describe('generateTableOfContents()', () => {
  const TestStringSource = `
    <div>
      <h1>Heading 1</h1>
      <h2>Sub-Heading 1.1</h2>
      <h3>Sub-Heading 1.1.1</h3>
      <h2 id="a-custom-id">Sub-Heading 1.2</h2>
      <h2>Sub-Heading 1.3</h2>
      <h3>Sub-Heading 1.3.1</h3>
      <h4>Sub-Heading 1.3.1.1</h4>
      <h2>Sub-Heading 1.4</h2>
    </div>
  `;

  const MakeHeadingElement = (level: number, text: string, id?: string) => {
    const element  = document.createElement(`h${ level }`);

    element.appendChild(document.createTextNode(text));

    if (id) {
      element.setAttribute('id', id);
    }

    return element;
  };

  const TestElementSource = () => {
    const container = document.createElement('div');

    container.append(
      MakeHeadingElement(1, 'Heading 1'),
      MakeHeadingElement(2, 'Sub-Heading 1.1'),
      MakeHeadingElement(3, 'Sub-Heading 1.1.1'),
      MakeHeadingElement(2, 'Sub-Heading 1.2', 'a-custom-id'),
      MakeHeadingElement(2, 'Sub-Heading 1.3'),
      MakeHeadingElement(3, 'Sub-Heading 1.3.1'),
      MakeHeadingElement(4, 'Sub-Heading 1.3.1.1'),
      MakeHeadingElement(2, 'Sub-Heading 1.4'),
    );

    return container;
  };

  const ExpectedTestStringResult = `
    <div>
      <h1>Heading 1</h1>
      <h2 id="sub-heading-1-1">Sub-Heading 1.1</h2>
      <h3 id="sub-heading-1-1__sub-heading-1-1-1">Sub-Heading 1.1.1</h3>
      <h2 id="a-custom-id">Sub-Heading 1.2</h2>
      <h2 id="sub-heading-1-3">Sub-Heading 1.3</h2>
      <h3 id="sub-heading-1-3__sub-heading-1-3-1">Sub-Heading 1.3.1</h3>
      <h4>Sub-Heading 1.3.1.1</h4>
      <h2 id="sub-heading-1-4">Sub-Heading 1.4</h2>
    </div>
  `;

  const TestObjectSourceA: TableOfContentsObjectSource[] = [
    { type: 'heading', data: { content: 'Heading 1', level: 1 } },
    { type: 'heading', data: { content: 'Sub-Heading 1.1', level: 2 } },
    { type: 'heading', data: { content: 'Sub-Heading 1.1.1', level: 3 } },
    { type: 'heading', data: { content: 'Sub-Heading 1.2', level: 2 } },
    { type: 'heading', data: { content: 'Sub-Heading 1.3', level: 2 } },
    { type: 'heading', data: { content: 'Sub-Heading 1.3.1', level: 3 } },
    { type: 'heading', data: { content: 'Sub-Heading 1.3.1.1', level: 4 } },
    { type: 'heading', data: { content: 'Sub-Heading 1.4', level: 2 } },
  ];

  const TestObjectSourceB: TableOfContentsObjectSource[] = [
    { type: 'header', data: { text: 'Heading 1', level: 1 } },
    { type: 'header', data: { text: 'Sub-Heading 1.1', level: 2 } },
    { type: 'header', data: { text: 'Sub-Heading 1.1.1', level: 3 } },
    { type: 'header', data: { text: 'Sub-Heading 1.2', level: 2 } },
    { type: 'header', data: { text: 'Sub-Heading 1.3', level: 2 } },
    { type: 'header', data: { text: 'Sub-Heading 1.3.1', level: 3 } },
    { type: 'header', data: { text: 'Sub-Heading 1.3.1.1', level: 4 } },
    { type: 'header', data: { text: 'Sub-Heading 1.4', level: 2 } },
  ];

  const TestObjectSourceC: TableOfContentsObjectSource[] = [
    { type: 'header', attrs: { level: 1 }, content: [{ type: 'text', text: 'Heading 1' }] },
    { type: 'header', attrs: { level: 2 }, content: [{ type: 'text', text: 'Sub-Heading 1.1' }] },
    { type: 'header', attrs: { level: 3 }, content: [{ type: 'text', text: 'Sub-Heading 1.1.1' }] },
    { type: 'header', attrs: { level: 2 }, content: [{ type: 'text', text: 'Sub-Heading 1.2' }] },
    { type: 'header', attrs: { level: 2 }, content: [{ type: 'text', text: 'Sub-Heading 1.3' }] },
    { type: 'header', attrs: { level: 3 }, content: [{ type: 'text', text: 'Sub-Heading 1.3.1' }] },
    { type: 'header', attrs: { level: 4 }, content: [{ type: 'text', text: 'Sub-Heading 1.3.1.1' }] },
    { type: 'header', attrs: { level: 2 }, content: [{ type: 'text', text: 'Sub-Heading 1.4' }] },
  ];


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
