import React from 'react';

import { ReactComponent as StarSvg } from '@/assets/images/star.svg';

const WrxfeedStar: React.VFC = () => {
  return (
    <div className="relative flex justify-center items-center w-[225.28px] h-[220.58px]">
      <StarSvg />
      <h1 className="absolute rotate-[15deg] text-xl font-bold">Gravity</h1>
    </div>
  );
};

export default WrxfeedStar;
