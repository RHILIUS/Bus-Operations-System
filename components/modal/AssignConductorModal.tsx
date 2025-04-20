'use client';
import Image from 'next/image';
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import DropdownButton from '../ui/DropdownButton';
import { useEffect, useState } from 'react';
import { fetchConductors } from '../../lib/fetchConductors';

interface Conductor {
  conductor_id: string;
  name: string;
  job: string;
  contact_no: string;
  address: string;
  image: string | null;
}

const AssignConductorModal = ({ onClose }: { onClose: () => void }) => {

  const [conductors, setConductors] = useState<Conductor[]>([]);
  const [filteredConductors, setFilteredConductors] = useState<Conductor[]>([]);

  useEffect(() => {
    const loadConductors = async () => {
      try {
        const data = await fetchConductors();
        setConductors(data);
        setFilteredConductors(data);
      } catch (error) {
        console.error('Error fetching conductors:', error);
      }
    };

    loadConductors();
  }, []);

  const sortAlphabetically = () => {
    const sorted = [...conductors].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredConductors(sorted);
  };

  const dropdownItems = [
    {
      name: 'Alphabetical',
      action: sortAlphabetically,
    },
  ];

  return (
    // Modal
    <main className="w-[720px] h-[600px] rounded-lg bg-white shadow-lg p-4 flex flex-col">
      {/*  Search Bar */}
      <header className='mb-4'>  
        <SearchBar placeholder='Search Bus' ></SearchBar>
      </header>

      {/* Title and Filter section */}
      <nav className='px-3 flex justify-between items-center mb-2'>
        <div className='font-medium text-lg'>Available Conductors</div>
        {/* Filter */}
        <div className='flex items-center'>
          <div className='font-medium mr-3'>Filter</div>
          <DropdownButton dropdownItems={dropdownItems}></DropdownButton>
        </div>
      </nav>

      {/* Bus List Section */}
      <section className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 mb-4">
         {filteredConductors.map((conductor, index) => (
          // Each Bus
          <article key={index} className="rounded-lg my-1 px-3 flex items-center h-20 bg-gray-50 hover:bg-gray-100 cursor-pointer text-black justify-between">
            {/* Bus Info */}
            <div className="flex items-center gap-3">
              {/* Bus Icon */}
              <div className="bg-gray-200 rounded-2xl h-20 w-20 flex items-center relative overflow-hidden">
                <Image
                  src={conductor.image || '/assets/images/bus-fallback.png'}
                  alt="Bus"
                  className="object-cover"
                  fill
                />
              </div>
              {/* Bus Details */}
              <div>
                <div className="flex gap-2 items-center">
                  <div>{conductor.name}</div>
                  <div className="text-sm text-gray-400">{conductor.job}</div>
                </div>
                <div className="text-sm text-gray-400">{conductor.contact_no}</div>
                <div className="text-sm text-gray-400">{`${conductor.address}`}</div>
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

export default AssignConductorModal;