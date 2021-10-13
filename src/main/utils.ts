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

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}
