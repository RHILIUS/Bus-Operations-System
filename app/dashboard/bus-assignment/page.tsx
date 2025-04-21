'use client';

import React, { useState } from 'react';
import AssignBusModal from '@/components/modal/AssignBusModal';
import AssignDriverModal from '@/components/modal/AssignDriverModal';
import AssignConductorModal from '@/components/modal/AssignConductorModal';
import AssignRouteModal from '@/components/modal/AssignRouteModal';
import Button from "@/components/ui/Button";


const BusAssignmentPage: React.FC = () => {

  const [showAssignBusModal, setShowAssignBusModal] = useState(false);
  const [showAssignDriverModal, setShowAssignDriverModal] = useState(false);
  const [showAssignConductorModal, setShowAssignConductorModal] = useState(false);
  const [showAssignRouteModal, setShowAssignRouteModal] = useState(false);


  return (
    <div className="h-screen flex justify-center items-center bg-gray-100"> {/* Main Container */}

    {/* Show Modal Button */}
    <Button text='Assign Bus' onClick={()=> setShowAssignBusModal(true)}   />
    <Button bgColor='bg-red-500' text='Assign Driver' onClick={()=> setShowAssignDriverModal(true)} />
    <Button bgColor='bg-yellow-500' text='Assign Conductor' onClick={()=> setShowAssignConductorModal(true)} />
    <Button bgColor='bg-orange-500' text='Assign Route to Bus' onClick={()=> setShowAssignRouteModal(true)} />



    {/* Overlay and Modal */}

    {/* Assign Bus */}
    {showAssignBusModal && (
      <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative pointer-events-auto">
          <AssignBusModal onClose={() => setShowAssignBusModal(false)} />
        </div>
      </div>
    )}

    {/* Assign Driver */}
    {showAssignDriverModal && (
      <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative pointer-events-auto">
          <AssignDriverModal onClose={() => setShowAssignDriverModal(false)} />
        </div>
      </div>
    )}

    {/* Assign Conductor */}
    {showAssignConductorModal && (
      <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative pointer-events-auto">
          <AssignConductorModal onClose={() => setShowAssignConductorModal(false)} />
        </div>
      </div>
    )}

    {/* Assign Route */}
    {showAssignRouteModal && (
      <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative pointer-events-auto">
          <AssignRouteModal onClose={() => setShowAssignRouteModal(false)} />
        </div>
      </div>
    )}


  </div>
  );
};

export default BusAssignmentPage;
