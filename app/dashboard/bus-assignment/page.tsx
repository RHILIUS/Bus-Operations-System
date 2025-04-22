'use client';

import React, { useEffect, useState } from 'react';
import AssignBusModal from '@/components/modal/AssignBusModal';
import AssignDriverModal from '@/components/modal/AssignDriverModal';
import AssignConductorModal from '@/components/modal/AssignConductorModal';
import AssignRouteModal from '@/components/modal/AssignRouteModal';
import Button from "@/components/ui/Button";
import styles from './bus-assignment.module.css';

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
        console.log('Fetched assignments:', data);
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  const handleClear = () => {
    // Clear logic for resetting form values or handling state
    console.log('Clear button clicked');
  };

  const handleAdd = () => {
    // Add logic for adding data to the table will be implemented later
    console.log('Add button clicked');
  };

  return (
    <div className="dashboard-content">
      <div className="center-box">
        <div className={styles.container}>

          {/* Assignment Boxes */}
          <div className={styles.topPart}>
            {/* Bus Box */}
            <div className={styles.topItem}>
              <div className={styles.assignmentBox}>
                <div className={styles.tab}>
                  <img src="/assets/images/assignedbus.png" alt="Bus Icon" className={styles.tabIcon} />
                  Bus
                </div>
                <button className={styles.saveButton} onClick={() => setShowAssignBusModal(true)}>
                  + Assign Bus
                </button>
                <input type="text" placeholder="Bus Number" />
                <input type="text" placeholder="Route" />
                <input type="text" placeholder="Status" />
              </div>
            </div>

            {/* Driver Box */}
            <div className={styles.topItem}>
              <div className={styles.assignmentBox}>
                <div className={styles.tab}>
                  <img src="/assets/images/bus-driver.png" alt="Driver Icon" className={styles.tabIcon} />
                  Driver
                </div>
                <button className={styles.saveButton} onClick={() => setShowAssignDriverModal(true)}>
                  + Assign Driver
                </button>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Status" />
                <input type="text" placeholder="Contact Number" />
              </div>
            </div>

            {/* Conductor Box */}
            <div className={styles.topItem}>
              <div className={styles.assignmentBox}>
                <div className={styles.tab}>
                  <img src="/assets/images/bus-conductor.png" alt="Conductor Icon" className={styles.tabIcon} />
                  Conductor
                </div>
                <button className={styles.saveButton} onClick={() => setShowAssignConductorModal(true)}>
                  + Assign Conductor
                </button>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Status" />
                <input type="text" placeholder="Contact Number" />
              </div>
            </div>
          </div>

          {/* Add and Clear Buttons */}
          <div className={styles.buttonRow}>
            <button className={styles.clearButton} onClick={handleClear}>CLEAR</button>
            <button className={styles.addButton} onClick={handleAdd}>ADD</button> {/* Separate style */}
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

          {/* Modals */}
          {showAssignBusModal && (
            <AssignBusModal onClose={() => setShowAssignBusModal(false)} />
          )}
          {showAssignDriverModal && (
            <AssignDriverModal onClose={() => setShowAssignDriverModal(false)} />
          )}
          {showAssignConductorModal && (
            <AssignConductorModal onClose={() => setShowAssignConductorModal(false)} />
          )}

        </div>
      </div>
    </div>
  );
};

export default BusAssignmentPage;
