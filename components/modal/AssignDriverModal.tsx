'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import DropdownButton from '../ui/DropdownButton';
import { useEffect} from 'react';
import { fetchDrivers } from '../../lib/fetchDrivers';

interface Driver {
  name: string;
  job: string;
  contact_no: string;
  address: string;
  image: string | null; 
}

const AssignDriverModal = ({ onClose }: { onClose: () => void }) => {

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        const data = await fetchDrivers();
        setDrivers(data);
        setFilteredDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    loadDrivers();
  }, []);

  const sortAlphabetically = () => {
    const sorted = [...drivers].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredDrivers(sorted);
  };

  const [filteredDrivers, setFilteredDrivers] = useState(drivers);
  const [searchTerm, setSearchTerm] = useState(''); // use state for search function

  const dropdownItems = [
    {
      name: 'Alphabetical',
      action: () => {
        const sorted = [...filteredDrivers].sort((a, b) => a.name.localeCompare(b.name));
        setFilteredDrivers(sorted);
      },
    },
  ];
  
  return (
    // Modal
    <main className="w-[720px] h-[600px] rounded-lg bg-white shadow-lg p-4 flex flex-col">
      {/*  Search Bar */}
      <header className='mb-4'>  
        <SearchBar placeholder='Search Bus' 
          value={searchTerm}
          onChange = {(e) => {
            const text = e.target.value;
            setSearchTerm(text);

            // Filter buses
            const filtered = drivers.filter((driver) =>
              driver.name.toLowerCase().includes(text.toLowerCase()) ||
              driver.job.toLowerCase().includes(text.toLowerCase()) ||
              driver.contactNo.toLowerCase().includes(text.toLowerCase()) ||
              driver.address.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredDrivers(filtered);

            
          }}
        
        
        ></SearchBar>
      </header>

      {/* Title and Filter section */}
      <nav className='px-3 flex justify-between items-center mb-2'>
        <div className='font-medium text-lg'>Available Drivers</div>
        {/* Filter */}
        <div className='flex items-center'>
          <div className='font-medium mr-3'>Filter</div>
          <DropdownButton dropdownItems={dropdownItems}></DropdownButton>
        </div>
      </nav>

      {/* Bus List Section */}
      <section className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 mb-4">
        {filteredDrivers.map((driver, index) => (
          // Each Bus
          <article key={index} className="rounded-lg my-1 px-3 flex items-center h-20 bg-gray-50 hover:bg-gray-100 cursor-pointer text-black justify-between">
            {/* Bus Info */}
            <div className="flex items-center gap-3">
              {/* Bus Icon */}
              <div className="bg-gray-200 rounded-2xl h-20 w-20 flex items-center relative overflow-hidden">
                <Image
                  src={driver.image || '/assets/images/bus-fallback.png'}
                  alt="Bus"
                  className="object-cover"
                  fill
                />
              </div>
              {/* Bus Details */}
              <div>
                <div className="flex gap-2 items-center">
                  <div>{driver.name}</div>
                  <div className="text-sm text-gray-400">{driver.job}</div>
                </div>
                <div className="text-sm text-gray-400">{driver.contactNo}</div>
                <div className="text-sm text-gray-400">{`${driver.address}`}</div>
              </div>
            </div>

            {/* Assign Button */}
            <Button
              text='Assign'
            ></Button>
                  
          </article>
        ))}
      </section>

      {/* Cancel button */}
      <footer className='flex justify-end'>
        <Button onClick={onClose} text='Cancel' bgColor='bg-gray-200' textColor='text-gray-700'></Button>
      </footer>

    </main>

  );
};

export default AssignDriverModal;