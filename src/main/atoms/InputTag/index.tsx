import React, { VFC } from 'react';

interface InputTagProps {
  text: string;
  onDelete: (text: string) => void;
}

const InputTag: VFC<InputTagProps> = ({ text, onDelete }) => {
  return (
    <div
      className="flex items-center h-5 bg-Accent-2 rounded px-2 m-0.5 text-2xs text-white"
      key={text}
    >
      {text}
      <button
        type="button"
        className="text-xs text-white font-bold ml-2"
        onClick={() => onDelete(text)}
      >
        &times;
      </button>
    </div>
  );
};

export default InputTag;
