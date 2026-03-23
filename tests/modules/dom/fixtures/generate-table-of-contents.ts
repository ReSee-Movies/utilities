import type { TableOfContentsObjectSource } from '@/dom/generate-table-of-contents';

export const TestStringSource = `
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

export const MakeHeadingElement = (level: number, text: string, id?: string) => {
  const element  = document.createElement(`h${ level }`);

  element.appendChild(document.createTextNode(text));

  if (id) {
    element.setAttribute('id', id);
  }

  return element;
};

export const TestElementSource = () => {
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

export const ExpectedTestStringResult = `
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

export const TestObjectSourceA: TableOfContentsObjectSource[] = [
  { type: 'heading', data: { content: 'Heading 1', level: 1 } },
  { type: 'heading', data: { content: 'Sub-Heading 1.1', level: 2 } },
  { type: 'heading', data: { content: 'Sub-Heading 1.1.1', level: 3 } },
  { type: 'heading', data: { content: 'Sub-Heading 1.2', level: 2 } },
  { type: 'heading', data: { content: 'Sub-Heading 1.3', level: 2 } },
  { type: 'heading', data: { content: 'Sub-Heading 1.3.1', level: 3 } },
  { type: 'heading', data: { content: 'Sub-Heading 1.3.1.1', level: 4 } },
  { type: 'heading', data: { content: 'Sub-Heading 1.4', level: 2 } },
];

export const TestObjectSourceB: TableOfContentsObjectSource[] = [
  { type: 'header', data: { text: 'Heading 1', level: 1 } },
  { type: 'header', data: { text: 'Sub-Heading 1.1', level: 2 } },
  { type: 'header', data: { text: 'Sub-Heading 1.1.1', level: 3 } },
  { type: 'header', data: { text: 'Sub-Heading 1.2', level: 2 } },
  { type: 'header', data: { text: 'Sub-Heading 1.3', level: 2 } },
  { type: 'header', data: { text: 'Sub-Heading 1.3.1', level: 3 } },
  { type: 'header', data: { text: 'Sub-Heading 1.3.1.1', level: 4 } },
  { type: 'header', data: { text: 'Sub-Heading 1.4', level: 2 } },
];

export const TestObjectSourceC: TableOfContentsObjectSource[] = [
  { type: 'header', attrs: { level: 1 }, content: [{ type: 'text', text: 'Heading 1' }] },
  { type: 'header', attrs: { level: 2 }, content: [{ type: 'text', text: 'Sub-Heading 1.1' }] },
  { type: 'header', attrs: { level: 3 }, content: [{ type: 'text', text: 'Sub-Heading 1.1.1' }] },
  { type: 'header', attrs: { level: 2 }, content: [{ type: 'text', text: 'Sub-Heading 1.2' }] },
  { type: 'header', attrs: { level: 2 }, content: [{ type: 'text', text: 'Sub-Heading 1.3' }] },
  { type: 'header', attrs: { level: 3 }, content: [{ type: 'text', text: 'Sub-Heading 1.3.1' }] },
  { type: 'header', attrs: { level: 4 }, content: [{ type: 'text', text: 'Sub-Heading 1.3.1.1' }] },
  { type: 'header', attrs: { level: 2 }, content: [{ type: 'para', content: [{ type: 'text', text: 'Sub-Heading 1.4' }]}] },
];
