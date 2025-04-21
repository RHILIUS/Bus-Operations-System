'use client';
import React, {useState} from 'react';


type DropdownItem = {
  name: string,
  action: () => void;
}
interface DropdownButtonProps{
  dropdownItems?: DropdownItem[];
}


const DropdownButton: React.FC<DropdownButtonProps> = ({dropdownItems=[]}) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [selectedLabel, setSelectedLabel] = useState('Options'); 

  
  
  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={toggleDropdown}
      >
        {selectedLabel}
        <svg
          className="ml-2 -mr-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg w-48 z-10">
          <div className="py-1">
          {dropdownItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                setIsOpen(false); 
                setSelectedLabel(item.name); 
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {item.name}
            </button>
          ))}
          </div>
        </div>
      )}
    </div>

  );
};

export default DropdownButton;