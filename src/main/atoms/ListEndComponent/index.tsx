import React from 'react';

interface ListEndComponentProps {
  message?: string;
}

const ListEndComponent: React.FC<ListEndComponentProps> = ({ message }) => {
  return (
    <>
      <p className="text-base text-center text-Neutral-4 mt-3 sm:mt-8">
        {message || "That's all for now."}
        <span role="img" aria-label="rocket">
          {' '}
          🚀
        </span>
      </p>
    </>
  );
};

ListEndComponent.defaultProps = {
  message: '',
};

export default ListEndComponent;
