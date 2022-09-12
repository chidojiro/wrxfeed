import { Button, ConfirmModal, Drawer, Input } from '@/common/components';
import { withMountOnOpen } from '@/common/hocs';
import { useDisclosure } from '@/common/hooks';
import { OpenClose } from '@/common/types';
import { useHistory } from 'react-router-dom';
import { AccessControlTabs } from './AccessControlTabs';

export type RolesDrawerProps = OpenClose;

export const RolesDrawer = withMountOnOpen()(({ onClose, open }: RolesDrawerProps) => {
  const history = useHistory();

  const confirmSaveDisclosure = useDisclosure();
  const saveSuccessDisclosure = useDisclosure();

  const handleSaveConfirm = () => {
    confirmSaveDisclosure.close();
    saveSuccessDisclosure.open();
  };

  const handleSuccessConfirm = () => {
    saveSuccessDisclosure.close();
    history.push('/admin/team-members');
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <ConfirmModal
        open={confirmSaveDisclosure.isOpen}
        onClose={confirmSaveDisclosure.close}
        onCancel={confirmSaveDisclosure.close}
        onConfirm={handleSaveConfirm}
        variant="alert"
        title="Update the settings for this role?"
        content="This will affect view access for all team members within this role."
      />
      <ConfirmModal
        open={saveSuccessDisclosure.isOpen}
        onClose={saveSuccessDisclosure.close}
        onConfirm={handleSuccessConfirm}
        variant="success"
        confirmButtonLabel="Manage"
        title="New role created!"
        content="You can also manage team members and their access from the team members tab."
      />
      <div className="flex flex-col h-full">
        <div className="bg-Gray-12 p-6 border-b border-solid border-Gray-11">
          <h2 className="text-lg font-medium">Roles</h2>
          <p className="text-sm text-[#6B7280] mt-1">
            By default Base Users can see all transactions. Deselect any property to hide them from
            all team members. Changes to the Base User will affect all team members.
          </p>
        </div>
        <div className="flex flex-col flex-1 px-6 pt-4 overflow-hidden">
          <label className="font-bold text-xs">Role Name</label>
          <Input placeholder="" className="mt-2" />
          <div className="mt-4">
            <label className="font-bold text-xs">Description</label>
            <Input placeholder="" className="mt-2" />
          </div>
          <AccessControlTabs />
        </div>
        <div className="py-5 px-6 flex justify-end border-t border-solid border-Gray-28">
          <Button variant="ghost" colorScheme="gray">
            Cancel
          </Button>
          <Button variant="solid" onClick={confirmSaveDisclosure.open}>
            Save
          </Button>
        </div>
      </div>
    </Drawer>
  );
});
