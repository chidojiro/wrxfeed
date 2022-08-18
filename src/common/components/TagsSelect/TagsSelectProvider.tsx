import { ReactUtils } from '../../utils';
import { TagsSelectProviderValue } from './types';

const [TagsSelectProvider, useTagsSelectContext] =
  ReactUtils.createContext<TagsSelectProviderValue<any>>();

export { TagsSelectProvider, useTagsSelectContext };
