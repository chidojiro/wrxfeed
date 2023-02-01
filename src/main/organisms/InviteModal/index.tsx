import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Contact } from '@/main/entity/contact.entity';
import { useGetContacts } from '@/main/hooks/contact.hook';
import ContactItem from '@/main/molecules/ContactItem';
import InviteTagInput from '@/main/atoms/InviteTagInput';
import { useInvite } from '@/main/hooks';
import { useDebounce } from '@/common/hooks';
import Modal from '@/common/atoms/Modal';
import Banner from '@/common/atoms/Banner';
import { GetInvitationContactsParams } from '@/invitation/types';

export type InviteModalProps = {
  open: boolean;
  onClose: () => void;
};

type InviteTagInputHandler = React.ElementRef<typeof InviteTagInput>;

const InviteModal: React.FC<InviteModalProps> = ({ open = false, onClose }) => {
  const tagInputRef = useRef<InviteTagInputHandler>(null);
  const [filter, setFilter] = useState<GetInvitationContactsParams>({
    text: '',
  });
  const { contacts } = useGetContacts(filter);
  const { sendInvitation, isSent } = useInvite();
  const [isLoading, setLoading] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const onSearchContact = useCallback(
    (value: string) => {
      setFilter({
        text: value,
      });
    },
    [setFilter],
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isSent) {
      setShowSuccessBanner(true);
      // Close banner after 3s
      timeout = setTimeout(() => setShowSuccessBanner(false), 3000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isSent]);

  const debounceSearchRequest = useDebounce(onSearchContact);

  const sendMultipleInvites = async (emails: string[]) => {
    setLoading(true);
    await Promise.all(emails.map((email) => sendInvitation({ email })));
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose} closeOnClickOutside>
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
          <div className="h-[320px] overflow-auto pb-5">
            <ul className="space-y-4">
              {contacts.map((contact: Contact) => (
                <React.Fragment key={contact.id}>
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
