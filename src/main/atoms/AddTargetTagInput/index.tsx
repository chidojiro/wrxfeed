import React, {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';

import { getColorByPropertyType } from '@main/utils';

import Loading from '@common/atoms/Loading';
import { SearchResult } from '@main/types';
import InputTag from '../InputTag';

interface AddTargetTagInputProps {
  placeholder?: string;
  loading?: boolean;
  onTextChange?: (value: string) => void;
  maxTag?: number;
  maxHeight?: number;
}

export interface AddTargetTagInputHandler {
  addItem: (item: SearchResult) => void;
  getItems: () => SearchResult[];
}

const AddTargetTagInput: ForwardRefRenderFunction<
  AddTargetTagInputHandler,
  AddTargetTagInputProps
> = ({ placeholder, loading, onTextChange, maxTag = 10 }, ref) => {
  const [items, setItems] = useState<SearchResult[]>([]);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  function isInList(property: SearchResult) {
    return items.includes(property);
  }

  function isValid(property: SearchResult) {
    let err = null;

    if (isInList(property)) {
      err = `${property.title} has already been added.`;
    }
    if (items?.length >= maxTag) {
      err = `You can only add up to ${maxTag} tags.`;
    }

    if (err) {
      setError(err);
      return false;
    }
    return true;
  }

  useImperativeHandle(ref, () => ({
    addItem: (item: SearchResult): void => {
      if (item && isValid(item)) {
        setItems([...items, item]);
        setValue('');
        setError(null);
        if (onTextChange) {
          onTextChange('');
        }
      }
    },
    getItems: () => items,
  }));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (onTextChange) {
      onTextChange(event.target.value);
    }
  };

  const handleDelete = (item: SearchResult) => {
    setItems((prevItems) => prevItems.filter((prevItem) => prevItem?.id !== item?.id));
  };

  return (
    <div className="flex flex-col">
      <div className="relative bg-Gray-12 flex flex-row items-center rounded-sm">
        <div className="flex flex-grow flex-wrap items-center p-2 focus-within:z-10 max-h-60 overflow-y-scroll">
          {items.map((item) => (
            <InputTag
              key={item?.id}
              text={item?.title}
              onDelete={() => handleDelete(item)}
              color={getColorByPropertyType(item?.type)}
            />
          ))}
          <input
            type="text"
            className="max-w-full min-w-[200px] py-1 rounded-none text-sm text-Gray-1 focus:outline-none bg-transparent"
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
          />
        </div>
        {loading && <Loading width={12} height={12} className="mr-3" />}
      </div>
      {error && <p className="text-system-alert text-xs mt-1">{error}</p>}
    </div>
  );
};

export default forwardRef(AddTargetTagInput);
