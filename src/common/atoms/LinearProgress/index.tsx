import React from 'react';

const LinearProgress = () => {
  return (
    <span className="linear-progress">
      <span className="linear-progress__bar1" />
      <span className="linear-progress__bar2" />
    </span>
  );
};

export default React.memo(LinearProgress);
