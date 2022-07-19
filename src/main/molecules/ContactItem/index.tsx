import React from 'react';
import { Contact } from '@/main/entity';
import clsx from 'clsx';

interface ContactItemProps {
  className?: string;
  contact: Contact;
  onSelect?: (contact: Contact) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ className, contact, onSelect }) => {
  return (
    <li
      aria-hidden="true"
      className={clsx(
        'flex flex-row items-center justify-between min-h-[46px] px-2 hover:bg-Gray-12',
        className || '',
      )}
      onClick={() => onSelect && onSelect(contact)}
      onKeyDown={() => onSelect && onSelect(contact)}
    >
      <div>
        <div className="flex flex-row space-x-1">
          <p className="text-xs text-Gray-1 font-semibold">{contact?.fullName ?? '<unknown>'}</p>
          <p className="text-xs text-Gray-1">{contact?.email}</p>
        </div>

        <div className="flex flex-row space-x-1">
          {contact?.jobTitle && <p className="text-xs text-Gray-6">{contact?.jobTitle}</p>}
          {contact?.departmentName && (
            <p className="text-xs text-Gray-6 max-w-xs truncate">
              <span className="text-Gray-6">• </span>
              {contact?.departmentName}
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

export default ContactItem;
