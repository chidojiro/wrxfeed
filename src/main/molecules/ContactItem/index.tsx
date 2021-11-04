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
        <div className="flex flex-row space-x-1">
          <p className="text-xs text-Gray-1 font-semibold">{contact.name ?? '<unknown>'}</p>
          {contact.title && (
            <p className="text-xs text-Gray-1">
              <span className="text-Gray-6">• </span>
              {contact.title}
            </p>
          )}
          {contact.department && (
            <p className="text-xs text-Gray-1">
              <span className="text-Gray-6">• </span>
              {contact.department}
            </p>
          )}
        </div>
        <p className="text-xs text-Gray-6 font-semibold">{contact.email}</p>
      </div>
    </li>
  );
};

export default ContactItem;
