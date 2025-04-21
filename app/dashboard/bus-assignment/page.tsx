'use client';

import React, { useEffect, useState } from 'react';
import AssignBusModal from '@/components/modal/AssignBusModal';
import AssignDriverModal from '@/components/modal/AssignDriverModal';
import AssignConductorModal from '@/components/modal/AssignConductorModal';
import Button from "@/components/ui/Button";
import styles from './bus-assignment.module.css'; // Create a CSS module for styling

interface RegularBusAssignment {
  RegularBusAssignmentID: string;
  DriverID: string;
  ConductorID: string;
  BusAssignment?: {
    BusID: string;
  } | null;
}


const BusAssignmentPage: React.FC = () => {

  const [busAssignments, setAssignments] = useState<RegularBusAssignment[]>([]);
  const [showAssignBusModal, setShowAssignBusModal] = useState(false);
  const [showAssignDriverModal, setShowAssignDriverModal] = useState(false);
  const [showAssignConductorModal, setShowAssignConductorModal] = useState(false);

  useEffect(() => {
      const fetchAssignments = async () => {
        try {
          const response = await fetch('/api/bus-assignment');
          if (!response.ok) {
            throw new Error(`Failed to fetch assignments: ${response.statusText}`);
          }
          const data = await response.json();
          console.log('Fetched assignments:', data); // Debugging
          setAssignments(data);
        } catch (error) {
          console.error('Error fetching assignments:', error);
        }
      };
    
      fetchAssignments();
    }, []);

  return (
    <div className="dashboard-content">
      <div className="center-box">
        <div className={styles.container}>

          {/* Show Modal Button */}
          {/* <Button text='Assign Bus' onClick={()=> setShowAssignBusModal(true)}   />
          <Button bgColor='bg-red-500' text='Assign Driver' onClick={()=> setShowAssignDriverModal(true)} />
          <Button bgColor='bg-yellow-500' text='Assign Conductor' onClick={()=> setShowAssignConductorModal(true)} /> */}


          {/* Overlay and Modal */}

          {/* Assign Bus */}
          {/* {showAssignBusModal && (
            <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="relative pointer-events-auto">
                <AssignBusModal onClose={() => setShowAssignBusModal(false)} />
              </div>
            </div>
          )} */}

          {/* Assign Driver */}
          {/* {showAssignDriverModal && (
            <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="relative pointer-events-auto">
                <AssignDriverModal onClose={() => setShowAssignDriverModal(false)} />
              </div>
            </div>
          )} */}

          {/* Assign Conductor */}
          {/* {showAssignConductorModal && (
            <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="relative pointer-events-auto">
                <AssignConductorModal onClose={() => setShowAssignConductorModal(false)} />
              </div>
            </div>
          )} */}

          
        
        {/* Top Part */}
        <div className={styles.topPart}>
          {/* Bus */}
          <div className={styles.topItem}>
            <h3>Bus</h3>
            {/* Add content here */}
          </div>

          {/* Driver */}
          <div className={styles.topItem}>
            <h3>Driver</h3>
            {/* Add content here */}
          </div>

          {/* Conductor */}
          <div className={styles.topItem}>
            <h3>Conductor</h3>
            {/* Add content here */}
          </div>
        </div>
        
        {/* Table Part */}
        <div className={styles.dataTable}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeadRow}>
                <th>Bus ID</th>
                <th>Driver</th>
                <th>Conductor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {busAssignments.map((assignment) => (
                <tr key={assignment.RegularBusAssignmentID} className={styles.tableRow}>
                  <td>{assignment.BusAssignment?.BusID}</td>
                  <td>{assignment.DriverID}</td>
                  <td>{assignment.ConductorID}</td>
                  <td className={styles.actions}>
                    <button className={styles.editBtn}>
                      <img src="/assets/images/edit.png" alt="Edit" />
                    </button>
                    <button className={styles.deleteBtn}>
                      <img src="/assets/images/delete.png" alt="Delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
  );
};

export default BusAssignmentPage;
