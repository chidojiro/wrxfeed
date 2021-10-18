import React from 'react';
import { Popover } from '@headlessui/react';

function MyPopover() {
  return (
    <Popover className="relative">
      <Popover.Button>Solutions</Popover.Button>
      <Popover.Panel className="absolute z-50 bg-white w-56 h-96">
        <div className="grid grid-cols-2">
          <div>Analytics</div>
          <div>Engagement</div>
          <div>Security</div>
          <div>Integrations</div>
        </div>

        <img src="/solutions.jpg" alt="" />
      </Popover.Panel>
    </Popover>
  );
}

export default MyPopover;
