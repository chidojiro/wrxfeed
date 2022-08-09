import { EMPTY_AMOUNT } from '@/common/constants';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bank, CategoryIcon, TeamIcon } from '@/assets';
import { ReactComponent as BasicsSearchSmall } from '@/assets/icons/outline/basics-search-small.svg';
import { ReactComponent as Files } from '@/assets/icons/outline/files.svg';
import { ReactComponent as GroupUsers } from '@/assets/icons/outline/group-users.svg';
import { ReactComponent as VendorIcon } from '@/assets/icons/outline/vendor.svg';
import {
  FeedItem,
  Transaction,
  TransLineItem,
  TranStatusNameColor,
  TranStatusType,
} from '@/main/entity';
import {
  Target,
  TargetByTeam,
  TargetMonth,
  TargetPeriod,
  TargetProps,
  TargetStatusConfig,
  TargetStatusType,
  TargetTypeProp,
} from '@/target/types';
import { extractLinks } from '@draft-js-plugins/linkify';
import { MentionData } from '@draft-js-plugins/mention';
import dayjs from 'dayjs';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  RawDraftContentBlock,
  RawDraftEntity,
  RawDraftEntityRange,
} from 'draft-js';
import { Match } from 'linkify-it';
import { cloneDeep } from 'lodash-es';
import numeral from 'numeral';
import React from 'react';
import { Fn } from '@/common/types';

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
 * Convert ContentState of editor to html included mention format
 */
export function commentEditorHtmlParser(contentState: ContentState): string {
  const { blocks, entityMap } = convertToRaw(contentState);
  let htmlContent = convertToHTML(contentState);
  // Find mention blocks and replace to html
  blocks.forEach((block) => {
    if (block.entityRanges.length) {
      block.entityRanges.forEach((entityRange) => {
        const entity = entityMap[entityRange.key];
        if (entity.type === 'mention') {
          // Create mention tag and replace
          const entityData = entityMap[entityRange.key].data.mention as MentionData;
          const mention = mentionTagCreator(entityData.id as number, entityData.name);
          htmlContent = htmlContent.replace(entityData.name, mention);
        }
      });
    }
  });
  return htmlContent;
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
  const indices = getIndicesOf(mentionName, text, true);
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
 * Convert a comment html to Draftjs ContentState
 */
export function commentHtmlToContentState(text: string): ContentState {
  const mentionMatches = text.match(MentionRegex);
  // No mentions => convert from html only
  if (!mentionMatches?.length) {
    return convertFromHTML(text);
  }
  // In case of mentions
  const rawText = text.replace(MentionRegex, mentionNameReplacer);
  // Create content state with mention entities
  const rawContent = convertToRaw(convertFromHTML(rawText));
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

/**
 * Get predefined bg gradient colors
 */
const BG_GRADIENT_COLORS = [
  'linear-gradient(90.91deg, #F4A27F 0.49%, #F28C6E 20.72%, #DB7271 40.14%, #9A5FAF 65.43%, #6A6AF2 80.23%, #9656AC 102.35%, #9656AC 105.59%)',
  'linear-gradient(90.64deg, #F08299 0.34%, #EF707E 20.62%, #CB8595 40.08%, #B7BAB8 65.42%, #C4BFAD 80.26%, #DDB495 98.34%, #DDB495 105.67%)',
  'linear-gradient(90.64deg, #B9A6D7 0.34%, #998DD5 20.62%, #7B78D8 40.08%, #5154DB 65.42%, #3C3FDC 80.26%, #5255DE 98.34%, #9656AC 105.67%)',
  'linear-gradient(90.64deg, #CF88AF 0.34%, #BD8CB5 20.62%, #AB85B1 40.08%, #9E79AD 65.42%, #9B76A6 80.26%, #977FAC 98.34%, #9656AC 105.67%)',
  'linear-gradient(90.64deg, #B4BBD6 0.34%, #A0AFC9 20.62%, #7E87D1 40.08%, #6F6EE0 65.42%, #7475DC 80.26%, #8E82CF 98.34%, #9686D0 105.67%)',
  'linear-gradient(90.64deg, #60B6C1 0.34%, #61BFC2 20.62%, #60BBC2 40.08%, #4E88A3 65.42%, #5387AA 80.26%, #6C9AB8 98.34%, #7CB1E3 105.67%)',
  'linear-gradient(90.64deg, #9FF2C2 0.34%, #7BCAD1 20.62%, #59A5DE 40.08%, #2B72F2 65.42%, #2065F6 80.26%, #2065F6 98.34%, #2065F6 105.67%)',
  'linear-gradient(90.64deg, #D98551 0.34%, #D27449 20.62%, #D7834C 40.08%, #E9AE57 65.42%, #F0C35D 80.26%, #F6D160 98.34%, #F8D85F 105.67%)',
  'linear-gradient(90.64deg, #777BBB 0.34%, #6071C2 20.62%, #636CC9 40.08%, #7964D6 65.42%, #825FDE 80.26%, #855CE5 98.34%, #855DE4 105.67%)',
  'linear-gradient(90.64deg, #77D3F9 0.34%, #6CBFE4 20.62%, #5291BC 40.08%, #3F6BC0 65.42%, #3C61D9 80.26%, #3E6ABA 98.34%, #3E6ABC 105.67%)',
];
/**
 * Get predefined bg solid colors
 */
const BG_SOLID_COLORS = [
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
export const getColorByText = (name?: string | null, id?: number, gradient = false): string => {
  const _name = name ?? '';
  let hash = 0;

  for (let i = 0; i < _name.length; i += 1) {
    hash += _name.charCodeAt(i);
  }

  const colorsData = gradient ? BG_GRADIENT_COLORS : BG_SOLID_COLORS;

  // there are 15 pre-defined colors of department. Position starts from 1
  const preDefined = id || hash;
  const bgColorPos = preDefined % colorsData.length;

  return colorsData[bgColorPos];
};

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

export const nFormatter = (num: number, withCurrency = '$', format = '0.0'): string => {
  const isNegative = num < 0 ? '-' : '';
  const positiveNum = Math.abs(num);
  if (positiveNum >= 1000000000) {
    return `${isNegative}${withCurrency}${numeral(positiveNum / 1000000000).format(format)}B`;
  }
  if (positiveNum >= 1000000) {
    return `${isNegative}${withCurrency}${numeral(positiveNum / 1000000).format(format)}M`;
  }
  if (positiveNum >= 1000) {
    return `${isNegative}${withCurrency}${numeral(positiveNum / 1000).format(format)}K`;
  }
  return `${isNegative}${withCurrency}${numeral(num).format(format)}`;
};

export const scrollToTop = (cb?: Fn): void => {
  if (cb) {
    // https://stackoverflow.com/questions/4620906/how-do-i-know-when-ive-stopped-scrolling
    let timer: NodeJS.Timeout;
    window.addEventListener(
      'scroll',
      function () {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          cb();
        }, 150);
      },
      false,
    );
  }

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
  let results: number[] = [];
  while (results.length < multi) {
    results.push(getRandomInt(min, max));
    results = Array.from(new Set(results));
  }
  return results;
};

// Vendor information updates when created by "Concur Integrations"
export const getVendorNameFromLineItem = (item?: TransLineItem): string => {
  // let vendorName = item?.vendor?.name || item?.description || `Expense: ${item?.vendorName}`;
  let vendorName = item?.vendor?.name || item?.description || '...';

  const des = item?.description;

  const isConcurByCreatedByName = item?.transaction?.createdByName;
  const isConcurByRecordType =
    item?.transaction?.recordType?.toLowerCase() === 'Expense Report'.toLowerCase();

  const checkDesIncludeSymbol = des?.toLowerCase().includes('|');

  if ((isConcurByCreatedByName || isConcurByRecordType) && checkDesIncludeSymbol) {
    const descriptionWithoutVendor = des?.substring(0, des?.lastIndexOf('|')) || '';
    const vendorNameFromDescription = des?.substring(des?.indexOf('|') + 1, des.length - 1) || '';
    vendorName = `${descriptionWithoutVendor} expense by ${vendorNameFromDescription}.`;
  }
  return vendorName;
};

export const getIconByResultType = (
  type: TargetTypeProp,
): React.FC<React.SVGAttributes<SVGElement>> => {
  if (type === TargetTypeProp.VENDOR) return VendorIcon;
  if (type === TargetTypeProp.DEPARTMENT) return GroupUsers;
  if (type === TargetTypeProp.CATEGORY) return Files;
  return BasicsSearchSmall;
};

export const getPropIconByType = (
  type: TargetTypeProp,
): React.FC<React.SVGAttributes<SVGElement>> => {
  if (type === TargetTypeProp.VENDOR) return Bank;
  if (type === TargetTypeProp.DEPARTMENT) return TeamIcon;
  if (type === TargetTypeProp.CATEGORY) return CategoryIcon;
  return BasicsSearchSmall;
};

export const getColorByPropertyType = (type: TargetTypeProp): string => {
  if (type === TargetTypeProp.VENDOR) return '#F3AA20';
  if (type === TargetTypeProp.DEPARTMENT) return '#0891B2';
  if (type === TargetTypeProp.CATEGORY) return '#6565FB';
  return '#6565FB';
};

export const getPropTypeDisplayName = (type: TargetTypeProp): string => {
  if (type === TargetTypeProp.VENDOR) return 'Vendor';
  if (type === TargetTypeProp.DEPARTMENT) return 'Team';
  if (type === TargetTypeProp.CATEGORY) return 'Category';
  return '#6565FB';
};

export const getUniqueListBy = (arr: any[], objectKey: string): any[] => {
  return [...new Map(arr.map((item: any) => [item[objectKey], item])).values()];
};

export const getTargetName = (target?: Target): string => {
  if (!target) {
    return '';
  }
  const { props = [], name } = target;
  if (typeof name === 'string' && name.length > 1) {
    return name;
  }
  if (!Array.isArray(props) || props.length === 0) return '';
  if (typeof target.props[0].name !== 'string' || target.props[0].name.length < 1) {
    return 'This target have no name!';
  }
  let targetName = target.props[0].name;
  if (props.length === 1) return targetName;
  for (let i = 1; i < props?.length; i += 1) {
    targetName += `, ${props[i].name}`;
  }
  return targetName;
};

export const getTransactionStatus = (status: string): TranStatusType => {
  return TranStatusNameColor[status];
};

export const getItemsSentence = (items: TargetProps[], pre = ''): string => {
  const cloneItems = cloneDeep(items);
  if (cloneItems.length === 0) return '';
  if (cloneItems.length === 1) return pre + cloneItems[0].name;
  if (cloneItems.length === 2) return `${pre} ${cloneItems[0].name} and ${cloneItems[1].name}`;
  const popped = cloneItems.pop();
  return `${cloneItems.map((item: TargetProps) => item.name).join(', ')} and ${popped?.name}`;
};

export const genReviewSentenceFromProperties = (
  vendorProps: TargetProps[] = [],
  categoryProps: TargetProps[] = [],
  departmentProps: TargetProps[] = [],
  exceptionProps: TargetProps[] = [],
): string => {
  const vendorSen = getItemsSentence(vendorProps);
  const catSen = getItemsSentence(categoryProps, ' spend within ');
  const teamSen = getItemsSentence(departmentProps, ' for ');
  const exceptSen = getItemsSentence(exceptionProps, ', except ');

  const sentence = `You're targeting all ${vendorSen} ${catSen} ${teamSen}${exceptSen}`;

  return sentence;
};

export const getPeriodsFromTargetMonths = (targetMonths: TargetMonth[], curYear: number) => {
  const periods: TargetPeriod[] = [];
  const availableMonths = targetMonths
    .filter((target) => target.amount !== undefined)
    .map((target) => target.month);

  const minMonth = Math.min(...availableMonths);
  const maxMonth = Math.max(...availableMonths);

  targetMonths.forEach((target: TargetMonth) => {
    if (target.month >= minMonth && target.month <= maxMonth) {
      periods.push({
        month: target.month,
        year: curYear,
        amount: target.amount ?? 0,
      });
    }
  });

  return periods;
};

export const getTargetPeriodsAmountTotal = (
  target: Target,
): {
  overallTarget: number;
  targetToDate: number;
  exceeding: number;
  currentSpend: number;
} => {
  const curMonth = new Date().getMonth() + 1;
  const curYear = new Date().getFullYear();
  const { overallTarget, targetToDate } = target?.periods.reduce(
    (sum, targetPeriod) => {
      if (targetPeriod.year === curYear) {
        return {
          overallTarget: sum.overallTarget + (targetPeriod.amount ?? 0),
          targetToDate:
            targetPeriod.month <= curMonth
              ? sum.targetToDate + (targetPeriod.amount ?? 0)
              : sum.targetToDate,
        };
      }
      return sum;
    },
    {
      overallTarget: 0,
      targetToDate: 0,
    },
  );

  const currentSpend =
    target?.spendings?.reduce((sum, spending) => {
      if (spending.year === curYear) {
        return sum + (spending.total ?? 0);
      }
      return sum;
    }, 0) ?? 0;

  const exceeding: number =
    targetToDate !== 0
      ? currentSpend > targetToDate
        ? ((currentSpend - targetToDate) / targetToDate) * 100
        : 0
      : 100;
  return { overallTarget, targetToDate, exceeding, currentSpend };
};

export const DecimalType = {
  DetailView: 'DetailView',
  ChartAxis: 'ChartAxis',
  SummedNumbers: 'SummedNumbers',
};

export const decimalLogic = (
  n?: string | number,
  type = DecimalType.DetailView,
  withCurrency = '$',
  toNumber = false,
): string | number => {
  let format = '0,0.00';
  let defaultValue = '0.00';

  let result = n ? numeral(n).format(format) : defaultValue;

  if (type === DecimalType.ChartAxis) {
    format = '0,0';
    defaultValue = '0';
    result = n ? numeral(n).format(format) : defaultValue;
    if (parseFloat(`${n}`) >= 1000000) {
      result = nFormatter(parseFloat(`${n}`), '', '0,0.0');
    } else if (parseFloat(`${n}`) >= 100) {
      result = nFormatter(parseFloat(`${n}`), '', '0,0');
    }
  }

  if (type === DecimalType.SummedNumbers) {
    format = '0,0';
    defaultValue = 'N/A';
    result = n ? numeral(n).format(format) : defaultValue;
    if (parseFloat(`${n}`) >= 1000000) {
      result = nFormatter(parseFloat(`${n}`), '', '0,0.00');
    } else if (parseFloat(`${n}`) >= 1000) {
      result = nFormatter(parseFloat(`${n}`), '', '0,0.0');
    }
  }

  if (toNumber) {
    return result + 0;
  }
  return result !== 'N/A' ? withCurrency + result : defaultValue;
};

export const getDisplayUsdAmount = (num?: number) =>
  num ? decimalLogic(num, DecimalType.SummedNumbers) : EMPTY_AMOUNT;

export const filterTargetsToTargetByTeam = (data: Target[]): TargetByTeam[] => {
  const targetByTeam: TargetByTeam[] = [];
  data.forEach((item: Target) => {
    const deptId = item.department?.id;
    const indexOfTeam = targetByTeam.findIndex(
      (team: TargetByTeam) => team.department.id === deptId,
    );
    if (item.department && indexOfTeam === -1) {
      targetByTeam.push({
        department: item.department,
        targets: [item],
      });
    } else if (indexOfTeam !== -1) {
      targetByTeam[indexOfTeam].targets.push(item);
    }
  });
  return targetByTeam;
};

export const getTrackingStatusName = (type: TargetStatusType): string => {
  return TargetStatusConfig[type].name;
};

export const getSummaryNumber = (value: number, total: number): string => {
  if (total === 0) {
    return '0%';
  }
  return `${Math.round((value * 100) / total)}%`;
};

export const toMonthName = (value: number) => {
  const date = new Date();
  date.setMonth(value - 1);

  return date.toLocaleString('en-US', {
    month: 'short',
  });
};

export const toUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
