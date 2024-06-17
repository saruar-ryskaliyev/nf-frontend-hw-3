import React from 'react';

interface DescriptionModalProps {
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({ description, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-80 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">About</h2>
        <button onClick={onClose} className="text-white">
          Close
        </button>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default DescriptionModal;
