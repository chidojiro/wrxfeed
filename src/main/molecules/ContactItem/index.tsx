import React, { VFC } from 'react';
import { Contact } from '@main/entity';
import { classNames } from '@common/utils';

interface ContactItemProps {
  className?: string;
  contact: Contact;
  onSelect?: (contact: Contact) => void;
}

const ContactItem: VFC<ContactItemProps> = ({ className, contact, onSelect }) => {
  return (
    <li
      aria-hidden="true"
      className={classNames(
        'flex flex-row items-center justify-between min-h-[46px] px-2 hover:bg-Gray-12',
        className || '',
      )}
      onClick={() => onSelect && onSelect(contact)}
      onKeyDown={() => onSelect && onSelect(contact)}
    >
      <div>
        <p className="text-xs text-Gray-1 font-semibold">{contact.name ?? '<unknown>'}</p>
        <p className="text-xs text-Gray-6 font-semibold">{contact.email}</p>
      </div>
    </li>
  );
};

export default ContactItem;
