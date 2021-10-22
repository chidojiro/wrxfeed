import React from 'react';

const BlankLayout: React.FC = ({ children, ...rest }) => {
  return (
    <div className="fixed inset-0 m-6 p-6 rounded-md bg-white overflow-scroll" {...rest}>
      {children}
    </div>
  );
};

export default BlankLayout;
