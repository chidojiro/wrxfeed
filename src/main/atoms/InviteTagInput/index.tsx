import { Button } from '@/common/components';
import { emailMatches, isEmail } from '@/common/utils';
import {
  ChangeEvent,
  ClipboardEventHandler,
  forwardRef,
  ForwardRefRenderFunction,
  KeyboardEventHandler,
  useImperativeHandle,
  useState,
} from 'react';
import InputTag from '../InputTag';

interface InviteTagInputProps {
  placeholder?: string;
  loading?: boolean;
  onTextChange?: (value: string) => void;
  onInvite?: (emails: string[]) => void;
}

export interface InviteTagInputHandler {
  addItem: (item: string) => void;
}

const InviteTagInput: ForwardRefRenderFunction<InviteTagInputHandler, InviteTagInputProps> = (
  { placeholder, loading, onTextChange, onInvite },
  ref,
) => {
  const [items, setItems] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  function isInList(email: string) {
    return items.includes(email);
  }

  function isValid(email: string) {
    let err = null;

    if (isInList(email)) {
      err = `${email} has already been added.`;
    }

    if (!isEmail(email)) {
      err = `${email} is not a valid email address.`;
    }

    if (err) {
      setError(err);
      return false;
    }
    return true;
  }

  useImperativeHandle(ref, () => ({
    addItem: (item: string): void => {
      if (item && isValid(item)) {
        setItems([...items, item]);
        setValue('');
        setError(null);
        if (onTextChange) {
          onTextChange('');
        }
      }
    },
  }));

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (['Enter', 'Tab', ',', ' '].includes(event.key)) {
      event.preventDefault();

      const currentValue = value.trim();

      if (currentValue && isValid(currentValue)) {
        setItems([...items, currentValue]);
        setValue('');
        setError(null);
        if (onTextChange) {
          onTextChange('');
        }
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (onTextChange) {
      onTextChange(event.target.value);
    }
  };

  const handleDelete = (item: string) => {
    setItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
  };

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();

    const paste = event.clipboardData?.getData('text');
    const emails = emailMatches(paste);

    if (emails) {
      const toBeAdded = emails.filter((email) => !isInList(email));

      setItems([...items, ...toBeAdded]);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative bg-Gray-12 flex flex-row items-center">
        <div className="flex flex-grow flex-wrap items-center px-4 py-1 focus-within:z-10">
          {items.map((item) => (
            <InputTag key={item} text={item} onDelete={handleDelete} />
          ))}

          <input
            type="text"
            className="max-w-full min-w-[200px] py-1 rounded-none text-sm text-Gray-1 focus:outline-none bg-transparent"
            value={value}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onPaste={handlePaste}
          />
        </div>

        <Button
          disabled={!items.length || loading}
          className="h-7 my-[3px] mr-1 px-5 bg-Gray-2 text-sm text-white shadow-sm rounded-sm disabled:bg-Gray-6"
          onClick={() => onInvite && onInvite(items)}
        >
          {loading ? 'Sending...' : 'Invite'}
        </Button>
      </div>
      {error && <p className="text-system-alert text-xs mt-1">{error}</p>}
    </div>
  );
};

export default forwardRef(InviteTagInput);
