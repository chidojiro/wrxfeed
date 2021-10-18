import React from 'react';

export interface TargetPanelProps {
  title?: string;
}

const TargetPanel: React.VFC<TargetPanelProps> = () => {
  return (
    <div className="flex flex-1 min-h-[80vh] py-12">
      <div className="flex w-72 bg-white px-8 py-4 max-h-106">
        <div className="flex text-Gray-1 text-base font-medium">Targets</div>
      </div>
    </div>
  );
};

export default TargetPanel;
