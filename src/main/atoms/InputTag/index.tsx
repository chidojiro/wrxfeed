import React from 'react';

interface InputTagProps {
  text: string;
  onDelete: (text: string) => void;
  color?: string;
}

const InputTag: React.FC<InputTagProps> = ({ text, onDelete, color }) => {
  return (
    <div
      className="flex items-center h-5 rounded-sm px-2 m-px text-3xs text-white bg-Accent-2"
      style={color ? { backgroundColor: color } : {}}
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
