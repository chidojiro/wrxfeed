import * as React from 'react';
import { useRecoilState } from 'recoil';
import { ReactComponent as CsvIcon } from '@/assets/icons/outline/csvIcon.svg';
import Modal from '@/common/atoms/Modal';
import { showUploadCSVModalState } from './states';
import { Button } from '@/common/components';

export type UploadCSVModalProps = {
  open?: boolean;
};

const UploadCSVModal: React.FC<UploadCSVModalProps> = ({ open = false }) => {
  const [isOpen, setIsOpen] = useRecoilState(showUploadCSVModalState);
  const handleClose = () => setIsOpen(false);

  React.useEffect(() => {
    setIsOpen(open);
  }, [setIsOpen, open]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="flex w-[31rem] h-[26.4rem]">
        <div className="p-6">
          <p className="text-lg font-bold">Import from CSV file</p>
          <p className="text-sm text-Gray-3 mt-0.5">Maximum size: 50MB</p>
        </div>
        <div className="flex flex-1 space-x-6">
          <div className="flex flex-row h-[1.625rem] bg-Gray-1 min-w-[9rem] space-x-2 items-center mr-auto rounded">
            <CsvIcon style={{ width: '20px', height: '17px' }} />
            <p className="text-sm text-white font-semibold ml-1">Select a file .csv</p>
          </div>
          <p className="text-Gray-3 mt-1">No file chosen</p>
        </div>
        <hr className="divider divider-horizontal" />
        <div className="flex flex-row space-x-6 py-32 h-[4.125rem] justify-end">
          <Button className="rounded text-sm font-bold text-Gray-2 px-5" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="bg-purple-5 rounded text-sm font-bold text-white ml-2 px-5"
            onClick={handleClose}
          >
            Upload file
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadCSVModal;
