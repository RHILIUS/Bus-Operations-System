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
    Route? : {
      RouteName: string;
    } | null;
  } | null;
  quotaPolicy?: {
    Fixed?: {
      Quota: string;
    } | null;
    Percentage?: {
      Percentage: string;
    } | null;
  } | null;
}

interface Bus {
  busId: string;
  route: string;
  type: string;
  capacity: number;
  image: string | null;
}

interface Driver {
  driver_id: string;
  name: string;
  job: string;
  contactNo: string;
  address: string;
  image: string | null; 
}

interface Conductor {
  conductor_id: string;
  name: string;
  job: string;
  contactNo: string;
  address: string;
  image: string | null;
}

interface Route {
  route_id: string;
  routeName: string;
}


const BusAssignmentPage: React.FC = () => {

  // Flags for modal
  const [busAssignments, setAssignments] = useState<RegularBusAssignment[]>([]);
  const [showAssignBusModal, setShowAssignBusModal] = useState(false);
  const [showAssignDriverModal, setShowAssignDriverModal] = useState(false);
  const [showAssignConductorModal, setShowAssignConductorModal] = useState(false);
  const [showAssignRouteModal, setShowAssignRouteModal] = useState(false);


  // current record
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedConductor, setSelectedConductor] = useState<Conductor | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editAssignment, setEditAssignment] = useState<RegularBusAssignment | null>(null);

  const [quotaType, setQuotaType] = useState('Fixed'); // Default to 'Fixed'
  const [quotaValue, setQuotaValue] = useState(''); // Default to an empty string

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/bus-assignment');
      if (!response.ok) {
        throw new Error(`Failed to fetch assignments: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched assignments:', data);
      setAssignments(data); // Update the table data
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  // **Initial data fetch on component mount**
  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleClear = () => {
    // Clear logic for resetting form values or handling state
    setSelectedBus(null);
    setSelectedDriver(null);
    setSelectedConductor(null);
    setSelectedRoute(null);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    // Gather the data to send to the API
    const data = {
      RouteID: selectedRoute?.RouteID || '', // Replace with the selected route ID
      BusID: selectedBus?.busId || '', // Use the selected bus ID
      AssignmentDate: new Date().toISOString(), // Use the current date or a selected date
      Battery: true, // Replace with actual form values
      Lights: true,
      Oil: true,
      Water: true,
      Break: true,
      Air: true,
      Gas: true,
      Engine: true,
      TireCondition: true,
      Self: true,
      DriverID: selectedDriver?.driver_id || '',
      ConductorID: selectedConductor?.conductor_id || '',
      Change: 0.0,
      TripRevenue: 1000.0,
      QuotaPolicy: {
        type: quotaType, // 'Fixed' or 'Percentage'
        value: quotaValue, // The processed quota value
      },
    };
  
    console.log('Data to be sent to API:', data); // Debugging
  
    try {
      // Send a POST request to the API route
      const response = await fetch('/api/bus-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create BusAssignment');
      }
  
      const result = await response.json();
      console.log('New BusAssignment created:', result);
  
      // Optionally, reset the form or update the UI
      handleClear();
      alert('BusAssignment created successfully!');
      // Refresh the table data
      fetchAssignments();
    } catch (error) {
      console.error('Error creating BusAssignment:', error);
      alert('Failed to create BusAssignment');
    }
  };

  const handleEdit = (assignment: RegularBusAssignment) => {
    setIsEditMode(true);
    setEditAssignment(assignment);

    // Populate the form with the selected assignment's values
    setSelectedBus({ busId: assignment.BusAssignment?.BusID });
    setSelectedDriver({ driver_id: assignment.DriverID });
    setSelectedConductor({ conductor_id: assignment.ConductorID });
  };

  return (


    <div className="dashboard-content">
      <div className="center-box">
        <div className={styles.container}>

          {/* Title */}
          <h2 className={styles.assignmentTitle}>CREATE ASSIGNMENT</h2>

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
                {/* <input type="text" value={selectedBus.busId} placeholder="Bus ID" /> */}
                <div className={styles.outputField}>
                  {selectedBus ? selectedBus.busId : 'None Selected'}
                </div>
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
                {/* <input type="text" placeholder="Name" /> */}
                <div className={styles.outputField}>
                  {selectedDriver ? selectedDriver.name : 'None Selected'}
                </div>
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
                {/* <input type="text" placeholder="Name" /> */}
                <div className={styles.outputField}>
                  {selectedConductor ? selectedConductor.name : 'None Selected'}
                </div>
              </div>
            </div>
          </div>

            {/* Bottom Row: Route + Quota + Buttons */}
            <div className={styles.bottomRow}>
              {/* Route Box */}
              <div className={styles.topItem}>
                <div className={styles.assignmentBox}>
                  <div className={styles.tab}>
                    <img src="/assets/images/assignedroute.png" alt="Route Icon" className={styles.tabIcon} />
                    Route
                  </div>
                  <button className={styles.saveButton} onClick={() => setShowAssignRouteModal(true)}>
                    + Assign Route
                  </button>
                  {/* <input type="text" placeholder="Route Name" /> */}
                  <div className={styles.outputField}>
                    {selectedRoute ? selectedRoute.RouteName : 'None Selected'}
                  </div>
                </div>
              </div>

              {/* Quota Box */}
              <div className={styles.topItem}>
                <div className={styles.assignmentBox}>
                  <div className={styles.tab}>
                    <img src="/assets/images/philippine-peso.png" alt="Quota Icon" className={styles.tabIcon} />
                    Quota
                  </div>
                  <select
                    className={styles.selectInput}
                    value={quotaType}
                    onChange={(e) => {
                      setQuotaType(e.target.value);
                      setQuotaValue(''); // Reset quota value when type changes
                    }}
                  >
                    <option value="Fixed">Fixed</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                  <input
                    type="number"
                    placeholder={quotaType === 'Fixed' ? 'Enter Fixed Value' : 'Enter Percentage (1-99)'}
                    value={quotaValue}
                    onChange={(e) => {
                      const value = e.target.value;

                      // Validation for Fixed
                      if (quotaType === 'Fixed') {
                        if (value && (!/^\d+(\.\d{1,2})?$/.test(value) || parseFloat(value) <= 0)) {
                          alert('Fixed value must be greater than 0 and have up to 2 decimal places.');
                          return;
                        }
                      }

                      // Validation for Percentage
                      if (quotaType === 'Percentage') {
                        if (value && (parseInt(value, 10) < 1 || parseInt(value, 10) > 99)) {
                          alert('Percentage value must be between 1 and 99.');
                          return;
                        }
                      }

                      setQuotaValue(value); // Update quota value if valid
                    }}
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement;

                      // Prevent negative numbers
                      if (input.value.includes('-')) {
                        input.value = input.value.replace('-', '');
                      }

                      // Prevent invalid decimal places for Fixed
                      if (quotaType === 'Fixed' && !/^\d+(\.\d{0,2})?$/.test(input.value)) {
                        input.value = input.value.slice(0, -1);
                      }

                      // Prevent values outside 1-99 for Percentage
                      if (quotaType === 'Percentage') {
                        const numericValue = parseInt(input.value, 10);
                        if (numericValue < 1) {
                          input.value = '1';
                        } else if (numericValue > 99) {
                          input.value = '99';
                        }
                      }
                    }}
                    step={quotaType === 'Fixed' ? '0.01' : '1'} // Allow up to 2 decimal places for Fixed, whole numbers for Percentage
                    min={quotaType === 'Fixed' ? '0.01' : '1'} // Minimum value
                    max={quotaType === 'Percentage' ? '99' : undefined} // Maximum value for Percentage
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className={styles.buttonColumn}>
                <button className={styles.clearButton} onClick={handleClear}>Clear</button>
                <button type="submit" className={styles.addButton} onClick={handleAdd}>Add</button>
              </div>
            </div>


          {/* Table Part */}
          <div className={styles.dataTable}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeadRow}>
                  <th>Assignment</th>
                  <th>Bus ID</th>
                  <th>Driver</th>
                  <th>Conductor</th>
                  <th>Route</th>
                  <th>Quota</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {busAssignments.map((assignment) => (
                  <tr key={assignment.RegularBusAssignmentID} className={styles.tableRow}>
                    <td>{assignment.RegularBusAssignmentID}</td>
                    <td>{assignment.BusAssignment?.BusID}</td>
                    <td>{assignment.DriverID}</td>
                    <td>{assignment.ConductorID}</td>
                    <td>{assignment.BusAssignment?.Route?.RouteName}</td>
                    <td>
                      {assignment.quotaPolicy?.Fixed
                        ? `Fixed: ${assignment.quotaPolicy.Fixed.Quota}`
                        : assignment.quotaPolicy?.Percentage
                        ? `Percentage: ${(parseFloat(assignment.quotaPolicy.Percentage.Percentage) * 100)}%`
                        : 'No Quota'}
                    </td>
                    <td className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(assignment)}
                      >
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
            <AssignBusModal 
              onClose={() => setShowAssignBusModal(false) } 
              onAssign={(bus) => {
                alert(`Assigned Bus: ${bus.busId}`);
                setSelectedBus(bus); // store or use it as needed
                setShowAssignBusModal(false); // close modal
              }}
            />
          )}
          {showAssignDriverModal && (
            <AssignDriverModal 
              onClose={() => setShowAssignDriverModal(false)} 
              onAssign={(driver) => {
                alert(`Assigned Driver: ${driver.name}`);
                setSelectedDriver(driver); // store or use it as needed
                setShowAssignDriverModal(false); // close modal
              }}
            />
          )}
          {showAssignConductorModal && (
            <AssignConductorModal 
              onClose={() => setShowAssignConductorModal(false)}
              onAssign={(conductor) => {
                alert(`Assigned Conductor: ${conductor.name}`);
                setSelectedConductor(conductor); // store or use it as needed
                setShowAssignConductorModal(false); // close modal
              }} 
            />
          )}
          {showAssignRouteModal && (
            <AssignRouteModal 
              onClose={() => setShowAssignRouteModal(false)}
              onAssign={(route) => {
                alert(`Assigned Route: ${route.RouteName}`);
                setSelectedRoute(route); // store or use it as needed
                setShowAssignRouteModal(false); // close modal
              }} 
            />
          )}
          

        </div>
      </div>
    </div>
  );
};

export default BusAssignmentPage;