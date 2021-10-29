import React, { useState, useCallback, useRef } from 'react';
import { Contact } from '@main/entity/contact.entity';
// import CommentBox from '@main/molecules/CommentBox';
import { GetContactsFilter } from '@api/types';
import { useGetContacts } from '@main/hooks/contact.hook';
import Modal from '@common/atoms/Modal';
import ContactItem from '@main/molecules/ContactItem';
import InviteTagInput from '@main/atoms/InviteTagInput/InviteTagInput';
import { useDebounce } from '@common/hooks';
import { useInvite } from '@main/hooks';
import Banner from '@common/atoms/Banner';

const DEBOUNCE_WAIT = 300;

export type InviteModalProps = {
  open: boolean;
  onClose: () => void;
};

const LIMIT = 20;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

type InviteTagInputHandler = React.ElementRef<typeof InviteTagInput>;

const InviteModal: React.FC<InviteModalProps> = ({ open = false, onClose }) => {
  const tagInputRef = useRef<InviteTagInputHandler>(null);
  const [filter, setFilter] = useState<GetContactsFilter>({
    text: '',
    pagination: INIT_PAGINATION,
  });
  const { contacts } = useGetContacts(filter);
  const { sendInvitation } = useInvite();
  const [isLoading, setLoading] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const onSearchContact = useCallback(
    (value: string) => {
      setFilter({
        text: value,
        pagination: INIT_PAGINATION,
      });
    },
    [setFilter],
  );
  const debounceSearchRequest = useDebounce(onSearchContact, DEBOUNCE_WAIT, [onSearchContact]);

  const sendMultipleInvites = async (emails: string[]) => {
    setLoading(true);
    await Promise.all(emails.map((email) => sendInvitation({ email })));
    setLoading(false);
    setShowSuccessBanner(true);
    // Close banner after 3s
    setTimeout(() => setShowSuccessBanner(false), 3000);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col w-[523px] h-[524px] outline-none">
        <div className="flex flex-col px-12 pt-8">
          <h3 className="text-base text-Gray-1 font-semibold">Add Co-Workers</h3>
          <p className="text-xs text-Gray-6">
            Invited users will see everything in the company except for comp data.
          </p>
        </div>
        <hr className="divider divider-horizontal my-5 w-full" />
        <div className="flex flex-col pb-12">
          <div className="px-12 pb-7">
            {showSuccessBanner ? (
              <Banner message="Invite Sent" onClose={() => setShowSuccessBanner(false)} />
            ) : (
              <InviteTagInput
                ref={tagInputRef}
                placeholder="Enter name or email address"
                loading={isLoading}
                onTextChange={debounceSearchRequest}
                onInvite={sendMultipleInvites}
              />
            )}
          </div>
          <div className="h-[320px] overflow-scroll pb-5">
            <ul className="space-y-4">
              {contacts.map((contact: Contact) => (
                <React.Fragment key={contact.email}>
                  <ContactItem
                    className="px-12"
                    contact={contact}
                    onSelect={(selected) => tagInputRef.current?.addItem(selected.email)}
                  />
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InviteModal;
