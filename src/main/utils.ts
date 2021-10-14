import { ContentState, convertToRaw, RawDraftContentBlock, RawDraftEntity } from 'draft-js';
import { MentionData } from '@draft-js-plugins/mention';

const MentionRegex = /<mention userid=['"][a-zA-Z0-9]+['"] tagname=['"][a-zA-Z0-9\s]+['"]\/>/gi;

export function tagReplacer(tag: string): string {
  const idMatches = tag.match(/userid="([a-zA-Z0-9]+)"/gi);
  const nameMatches = tag.match(/tagname="([a-zA-Z0-9\s]+)"/gi);
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

export function classNames(classes: string[]): string {
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
