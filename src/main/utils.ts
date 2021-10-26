import { ContentState, convertToRaw, RawDraftContentBlock, RawDraftEntity } from 'draft-js';
import { MentionData } from '@draft-js-plugins/mention';

const UserIdRegex = /userid="([a-zA-Z0-9]+)"/gi;
const TagNameRegex = /tagname="([\w\d\s!@#$%^&*()_+\-=[\]{};:\\|,.?]+)"/gi;
const MentionRegex =
  /<mention userid=['"][a-zA-Z0-9]+['"] tagname=['"][\w\d\s!@#$%^&*()_+\-=[\]{};:\\|,.?]+['"]\/>/gi;

export function tagReplacer(tag: string): string {
  const idMatches = tag.match(UserIdRegex);
  const nameMatches = tag.match(TagNameRegex);
  if (!idMatches?.length || !nameMatches?.length) return tag;

  return `<span id='${idMatches[0].split('"')[1]}' class='mention'>${
    nameMatches[0].split('"')[1]
  }</span>`;
}

export function tokenizeComment(text: string): string {
  if (!text) return text;
  return text.replace(MentionRegex, tagReplacer);
}

export function mentionTagCreator(id: number, name: string): string {
  return `<mention userid="${id}" tagname="${name}"/>`;
}

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

export function commentEditorRawParser(contentState: ContentState): string {
  const { blocks, entityMap } = convertToRaw(contentState);
  const rawTextBlocks = blocks.reduce<string[]>(
    (textBlocks, block) => [...textBlocks, contentBlockParser(block, entityMap)],
    [],
  );
  return rawTextBlocks.join('\n');
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
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
  if (num >= 1000000000) {
    return `${withCurrency}${(num / 1000000000).toFixed(1).replace(/\.0$/, '')}G`;
  }
  if (num >= 1000000) {
    return `${withCurrency}${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (num >= 1000) {
    return `${withCurrency}${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `${withCurrency}${num}`;
};
