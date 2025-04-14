import React from 'react';
import Link from "next/link"


const BusAssignmentPage: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        marginTop: '100px',
        color: '#000'
      }}
    >
      <h1>This is dedicated for BUS ASSIGNMENT</h1>
      <Link href="/assign-bus-modal?showDialog=y" className="text-3xl underline">Assign Bus Modal</Link>
      <br></br>
      <Link href="/assign-conductor-modal?showDialog=y" className="text-3xl underline">Assign Conductor Modal</Link>
      <br></br>
      <Link href="/assign-driver-modal?showDialog=y" className="text-3xl underline">Assign Driver Modal</Link>
    </div>
  );
};

export default BusAssignmentPage;