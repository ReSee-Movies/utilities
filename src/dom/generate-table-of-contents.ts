import { toInteger } from '../numbers/to-integer';
import { isString } from '../strings/is-string';
import { slugify } from '../strings/slugify';


const HeaderRegex = /<[\s\n\r\t]*[Hh](?<level>\d)(?<attrs>.*?)>(?<content>.*?)<\/[Hh]\d>/gms;
const IdAttrRegex = /(?<preId>.*?)(?:id[\s\n\r\t]*=[\s\n\r\t]*["'](?<id>.*?)["'])(?<postId>.*?)/s;


export type Options = {
  minDepth : 1 | 2 | 3 | 4 | 5 | 6;
  maxDepth : 1 | 2 | 3 | 4 | 5 | 6;
  enabled  : boolean;
};

export type TableOfContents = {
  level    : number;
  text     : string;
  slug     : string;
  parent   : TableOfContents | undefined;
  children : TableOfContents[];
};

type StringSource = string;

type ElementSource = HTMLElement;

type ObjectSource = object | {
  type : 'heading';
  id   : string;
  data : { content: string; level: number };
};

type TableOfContentsSource = StringSource | ElementSource | ObjectSource[];

type HeadingInfo = {
  level : number;
  text  : string;
  slug  : string;
  apply : <Source>(update: Source, offsetOrIndex?: number) => Source;
};


/**
 * Makes a best-effort attempt to extract heading tag information from
 * a string of HTML content.
 */
function extractStringSourceHeadings(source: string) {
  const results: HeadingInfo[] = [];

  let match: RegExpExecArray | null = null;

  do {
    match = HeaderRegex.exec(source);

    if (match?.groups) {
      const level = toInteger(match.groups.level);
      const text  = match.groups.content;
      const attrs = match.groups.attrs?.match(IdAttrRegex);
      const slug  = attrs?.groups?.id || slugify(match.groups.content);

      const originalMatch = match[0];
      const startingIdx   = match.index;
      const preIdAttrs    = attrs?.groups?.preId ?? '';
      const postIdAttrs   = attrs?.groups?.postId ?? '';

      results.push({
        level,
        slug,
        text,
        apply(update, offset = 0) {
          const tagName    = `h${ this.level }`;
          const attributes =  [preIdAttrs, `id="${ this.slug }"`, postIdAttrs].filter(Boolean).join(' ');
          const newTag     = `<${ tagName } ${ attributes }>${ this.text }</${ tagName }>`;

          return isString(update)
            ? update.substring(0, startingIdx + offset) + newTag + update.substring(startingIdx + offset + originalMatch.length) as typeof update
            : update;
        },
      });
    }
  } while (match);

  return results;
}


/**
 * Extracts heading info from an HTMLElement (e.x. a <div /> with a bunch of content inside).
 */
function extractElementSourceHeadings(source: ElementSource) {
  const results: HeadingInfo[] = [];

  source.querySelectorAll<HTMLHeadingElement>('h1,h2,h3,h4,h5,h6').forEach((element) => {
    const level = toInteger(element.tagName.at(-1));
    const slug  = element.id || slugify(element.innerText);

    results.push({
      level,
      slug,
      text: element.innerText,
      apply(update) {
        element.id = this.slug;
        return update;
      },
    });
  });

  return results;
}


/**
 * Extracts heading info from an array of object like those that are generated
 * by the Codex block content editor.
 */
function extractObjectSourceHeadings(source: ObjectSource[]) {
  const results: HeadingInfo[] = [];

  for (const entry of source) {
    if ('type' in entry && entry.type === 'heading') {
      results.push({
        level : entry.data.level,
        slug  : slugify(entry.data.content),
        text  : entry.data.content,

        apply(update) {
          entry.id = this.slug;
          return update;
        },
      });
    }
  }

  return results;
}


function adoptChild(child: TableOfContents, parent: TableOfContents | undefined, orphanage?: TableOfContents[]) {
  child.slug   = (parent ? parent.slug + '__' : '') + child.slug;
  child.parent = parent;

  parent?.children.push(child);

  if (!parent) {
    orphanage?.push(child);
  }
}


/**
 * Given an HTML container that contains one or more header elements, this method
 * will return a hierarchical representation of the headers in a manner suitable
 * for generating a table of contents.
 */
export function generateTableOfContents<
  S extends TableOfContentsSource,
>(source: S, options?: Partial<Options>): { tableOfContents: TableOfContents[]; contentSource: S } {
  const config = { minDepth: 2, maxDepth: 3, enabled: true, ...options } as Options;

  if (!config.enabled) {
    return { tableOfContents: [], contentSource: source };
  }

  let headings = [] as HeadingInfo[];

  if (isString(source)) {
    headings = extractStringSourceHeadings(source);
  }
  else if (source instanceof HTMLElement) {
    headings = extractElementSourceHeadings(source);
  }
  else if (Array.isArray(source)) {
    headings = extractObjectSourceHeadings(source);
  }
  else {
    return { tableOfContents: [], contentSource: source };
  }

  const tableOfContents = [] as TableOfContents[];

  let contentSource = source;
  let previousEntry = undefined as undefined | TableOfContents;

  for (const heading of headings) {
    if (heading.level < config.minDepth || heading.level > config.maxDepth) {
      continue;
    }

    const currentEntry = {
      level    : heading.level,
      text     : heading.text,
      slug     : heading.slug,
      parent   : undefined,
      children : [],
    } as TableOfContents;


    if (previousEntry) {
      if (previousEntry.level === heading.level) {
        adoptChild(currentEntry, previousEntry.parent, tableOfContents);
      }
      else if (previousEntry.level < currentEntry.level) {
        adoptChild(currentEntry, previousEntry);
      }
      else if (previousEntry.level > currentEntry.level) {
        let ancestor = previousEntry.parent;

        do {
          ancestor = ancestor?.parent;
        } while ((ancestor?.level ?? 0) >= currentEntry.level);

        adoptChild(currentEntry, ancestor, tableOfContents);
      }
    }
    else {
      tableOfContents.push(currentEntry);
    }


    heading.slug = currentEntry.slug;

    contentSource = isString(source) && isString(contentSource)
      ? heading.apply(contentSource, contentSource.length - source.length)
      : heading.apply(contentSource);

    previousEntry = currentEntry;
  }

  return { tableOfContents, contentSource };
}
