import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  RawDraftContentBlock,
  RawDraftEntity,
  RawDraftEntityRange,
} from 'draft-js';
import { MentionData } from '@draft-js-plugins/mention';
import { extractLinks } from '@draft-js-plugins/linkify';
import { Match } from 'linkify-it';

const UserIdRegex = /userid="([a-zA-Z0-9]+)"/gi;
const TagNameRegex = /tagname="([\w\d\s!@#$%^&*()_+\-=[\]{};:\\|,.?]+)"/gi;
const MentionRegex =
  /<mention userid=['"][a-zA-Z0-9]+['"] tagname=['"][\w\d\s!@#$%^&*()_+\-=[\]{};:\\|,.?]+['"]\/>/gi;

/**
 * Replace mention tag (<mention />) with HTML <span />
 */
export function mentionUIReplacer(tag: string): string {
  const idMatches = tag.match(UserIdRegex);
  const nameMatches = tag.match(TagNameRegex);
  if (!idMatches?.length || !nameMatches?.length) return tag;

  return `<span id='${idMatches[0].split('"')[1]}' class='mention'>${
    nameMatches[0].split('"')[1]
  }</span>`;
}

/**
 * Replace mention tag (<mention />) with user name
 */
export function mentionNameReplacer(tag: string): string {
  const nameMatches = tag.match(TagNameRegex);
  if (!nameMatches?.length) return tag;

  return nameMatches[0].split('"')[1];
}

/**
 * Replace hyperlink with UI html <a />
 */
export function linkReplacer(link: string): string {
  return `<a class='hyperlink' href=${link} target='_blank' rel='noopener noreferrer'>${link}</a>`;
}

/**
 * Create mention RawDraftEntity from mention tag (<mention />)
 */
export function rawMentionEntityCreator(tag: string): RawDraftEntity | null {
  const idMatches = tag.match(UserIdRegex);
  const nameMatches = tag.match(TagNameRegex);
  if (!idMatches?.length || !nameMatches?.length) return null;

  return {
    type: 'mention',
    mutability: 'IMMUTABLE',
    data: {
      mention: { id: parseInt(idMatches[0].split('"')[1], 10), name: nameMatches[0].split('"')[1] },
    },
  };
}

/**
 * Extract hyperlinks matches from text
 */
export function extractHyperlinks(text: string): Match[] | null {
  const linkSchemas = ['http:', 'https:'];
  const linkMatches = extractLinks(text);
  return linkMatches?.filter((match) => linkSchemas.includes(match.schema)) || null;
}

/**
 * Convert comment content to HTML
 */
export function tokenizeComment(text: string): string {
  if (!text) return text;
  // Replace mentions
  let tokenizedText = text.replace(MentionRegex, mentionUIReplacer);
  // Linkify
  const linkMatches = extractHyperlinks(tokenizedText);
  linkMatches?.forEach((linkMatch) => {
    tokenizedText = tokenizedText.replace(linkMatch.raw, linkReplacer);
  });
  return tokenizedText;
}

/**
 * Create a mention tag from id and name
 */
export function mentionTagCreator(id: number, name: string): string {
  return `<mention userid="${id}" tagname="${name}"/>`;
}

/**
 * Convert content blocks inlcudes entities of ContentState to text
 */
export function contentBlockParser(
  block: RawDraftContentBlock,
  entityMap: { [p: string]: RawDraftEntity<{ [p: string]: unknown }> },
): string {
  if (!block.entityRanges.length) return block.text;
  return block.entityRanges.reduce<string>((text, entityRange) => {
    const entity = entityMap[entityRange.key];
    // Parse mention
    if (entity.type !== 'mention') return text;
    const entityData = entityMap[entityRange.key].data.mention as MentionData;
    const mention = mentionTagCreator(entityData.id as number, entityData.name);
    return text.replace(entityData.name, mention);
  }, block.text);
}

/**
 * Convert ContentState of editor to text
 */
export function commentEditorRawParser(contentState: ContentState): string {
  const { blocks, entityMap } = convertToRaw(contentState);
  const rawTextBlocks = blocks.reduce<string[]>(
    (textBlocks, block) => [...textBlocks, contentBlockParser(block, entityMap)],
    [],
  );
  return rawTextBlocks.join('\n');
}

/**
 * Get Indices for entity ranges
 */
const getIndicesOf = (searchStr: string, str: string, caseSensitive?: boolean) => {
  let tempStr = str;
  let tempSearchStr = searchStr;
  const searchStrLen = tempSearchStr.length;
  if (searchStrLen === 0) {
    return [];
  }
  let startIndex = 0;
  let index;
  const indices = [];
  if (!caseSensitive) {
    tempStr = tempStr.toLowerCase();
    tempSearchStr = tempSearchStr.toLowerCase();
  }

  index = tempStr.indexOf(tempSearchStr, startIndex);
  while (index > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
    index = tempStr.indexOf(tempSearchStr, startIndex);
  }
  return indices;
};

/**
 * Get entity ranges of mention in text
 */
const getMentionEntityRanges = (text: string, mentionName: string, mentionKey: number) => {
  const indices = getIndicesOf(mentionName, text);
  if (indices.length > 0) {
    return indices.map((offset) => ({
      key: mentionKey,
      length: mentionName.length,
      offset,
    }));
  }

  return null;
};

/**
 * Convert a comment text to Draftjs ContentState
 */
export function commentTextToContentState(text: string): ContentState {
  const mentionMatches = text.match(MentionRegex);
  const rawText = text.replace(MentionRegex, mentionNameReplacer);
  if (mentionMatches?.length) {
    // Create content state with mention entities
    const rawContent = convertToRaw(ContentState.createFromText(rawText));
    // Create mention draft raw entities
    const rawMentionState = mentionMatches.reduce<{ [key: string]: RawDraftEntity }>(
      (map, tag, idx) => {
        const entity = rawMentionEntityCreator(tag);
        if (!entity) return map;
        return { ...map, [idx]: entity };
      },
      {},
    );
    rawContent.entityMap = rawMentionState;
    // Map mention entities to content blocks
    rawContent.blocks = rawContent.blocks.map((block) => {
      const ranges: RawDraftEntityRange[] = [];
      Object.keys(rawMentionState).forEach((key) => {
        const entityRanges = getMentionEntityRanges(
          block.text,
          rawMentionState[key].data.mention.name,
          parseInt(key, 10),
        );
        if (entityRanges) {
          ranges.push(...entityRanges);
        }
      });
      return { ...block, entityRanges: ranges };
    });
    return convertFromRaw(rawContent);
  }
  return ContentState.createFromText(text);
}

/**
 * Get department bg color based on name
 */
const DEPT_COLORS = [
  '#254252',
  '#14213D',
  '#1F1A44',
  '#2451BF',
  '#4F46E5',
  '#202898',
  '#853BFF',
  '#6B23DC',
  '#43249E',
  '#13B9B9',
  '#0891B2',
  '#066B64',
  '#F3AA20',
  '#DF6622',
  '#F64C32',
];
export function getDepartmentBgColor(name: string): string {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < name.length; i += 1) {
    hash += name.charCodeAt(i);
  }

  // there are 15 pre-defined colors of department. Position starts from 1
  const bgColorPos = hash % DEPT_COLORS.length;

  return DEPT_COLORS[bgColorPos];
}

export function isURL(str: string): boolean {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}

export const getNameAbbreviation = (name?: string): string => {
  if (!name) return '';
  const nameStr = name;
  return nameStr
    .replace(' &', '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

export const nFormatter = (num: number, withCurrency = '$'): string => {
  const isNegative = num < 0 ? '-' : '';
  const positiveNum = Math.abs(num);
  if (positiveNum >= 1000000000) {
    return `${isNegative}${withCurrency}${(positiveNum / 1000000000)
      .toFixed(1)
      .replace(/\.0$/, '')}B`;
  }
  if (positiveNum >= 1000000) {
    return `${isNegative}${withCurrency}${(positiveNum / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (positiveNum >= 1000) {
    return `${isNegative}${withCurrency}${(positiveNum / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `${isNegative}${withCurrency}${num}`;
};

export const scrollToTop = (): void => {
  if (window.scrollY > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

export const isEmptyOrSpaces = (str: string): boolean => {
  return str === undefined || str === null || str.length === 0 || str.match(/^ *$/) !== null;
};

export const getRandomInt = (min: number, max: number): number => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

export const getMultiRandomInt = (multi: number, min: number, max: number): number[] => {
  const results = [];
  for (let i = 0; i < multi; i += 1) {
    results.push(getRandomInt(min, max));
  }
  return results;
};
