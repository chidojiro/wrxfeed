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
