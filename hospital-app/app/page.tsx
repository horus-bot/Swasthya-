'use client';

import { useState } from 'react';
import { supabase } from './lib/api/supabase';

export default function CrudPlayground() {
  /* ================= DOCTOR ================= */
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');

  const insertDoctor = async () => {
    if (!doctorName || !specialization) {
      alert('Fill doctor details');
      return;
    }

    await supabase.from('doctor').insert({
      name: doctorName,
      specialization,
      on_duty: true,
      availability_status: 'available',
    });

    alert('Doctor inserted');
    setDoctorName('');
    setSpecialization('');
  };

  /* ================= BED STATUS ================= */
  const [bedType, setBedType] = useState('');
  const [totalBeds, setTotalBeds] = useState(0);
  const [availableBeds, setAvailableBeds] = useState(0);
  const [occupiedBeds, setOccupiedBeds] = useState(0);

  const insertBedStatus = async () => {
    await supabase.from('bed_status').insert({
      bed_type: bedType,
      total_beds: totalBeds,
      available_beds: availableBeds,
      occupied_beds: occupiedBeds,
    });

    alert('Bed status inserted');
  };

  /* ================= APPOINTMENT ================= */
  const [patientName, setPatientName] = useState('');
  const [conditionType, setConditionType] = useState('');

  const insertAppointment = async () => {
    const { data: doctor } = await supabase
      .from('doctor')
      .select('id')
      .limit(1)
      .single();

    if (!doctor) {
      alert('Create a doctor first');
      return;
    }

    await supabase.from('appointment').insert({
      doctor_id: doctor.id,
      patient_name: patientName,
      condition_type: conditionType,
      appointment_time: new Date().toISOString(),
    });

    alert('Appointment inserted');
    setPatientName('');
    setConditionType('');
  };

  /* ================= EQUIPMENT ================= */
  const [equipmentName, setEquipmentName] = useState('');

  const insertEquipment = async () => {
    await supabase.from('equipment').insert({
      equipment_name: equipmentName,
      status: 'available',
    });

    alert('Equipment inserted');
    setEquipmentName('');
  };

  /* ================= EQUIPMENT REQUEST ================= */
  const [issueDescription, setIssueDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const insertEquipmentRequest = async () => {
    const { data: equipment } = await supabase
      .from('equipment')
      .select('id')
      .limit(1)
      .single();

    if (!equipment) {
      alert('Create equipment first');
      return;
    }

    await supabase.from('equipment_request').insert({
      equipment_id: equipment.id,
      issue_description: issueDescription,
      priority,
    });

    alert('Equipment request inserted');
    setIssueDescription('');
  };

  /* ================= NOTIFICATION ================= */
  const [notificationType, setNotificationType] = useState('');
  const [message, setMessage] = useState('');

  const insertNotification = async () => {
    await supabase.from('notification').insert({
      type: notificationType,
      message,
    });

    alert('Notification inserted');
    setNotificationType('');
    setMessage('');
  };

  return (
    <div className="bg-white p-5 rounded-lg max-w-4xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-6">Supabase CRUD Test Page</h1>

      {/* DOCTOR */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Doctor</h2>
        <div className="space-y-3">
          <input 
            placeholder="Name" 
            value={doctorName} 
            onChange={e => setDoctorName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input 
            placeholder="Specialization" 
            value={specialization} 
            onChange={e => setSpecialization(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button 
            onClick={insertDoctor}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Insert Doctor
          </button>
        </div>
      </div>

      {/* BED STATUS */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Bed Status</h2>
        <div className="space-y-3">
          <input 
            placeholder="Bed Type" 
            value={bedType} 
            onChange={e => setBedType(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input type="number" placeholder="Total" onChange={e => setTotalBeds(+e.target.value)} />
          <input type="number" placeholder="Available" onChange={e => setAvailableBeds(+e.target.value)} />
          <input type="number" placeholder="Occupied" onChange={e => setOccupiedBeds(+e.target.value)} />
          <button onClick={insertBedStatus}>Insert Bed Status</button>
        </div>
      </div>

      {/* APPOINTMENT */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Appointment</h2>
        <div className="space-y-3">
          <input 
            placeholder="Patient Name" 
            value={patientName} 
            onChange={e => setPatientName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input 
            placeholder="Condition" 
            value={conditionType} 
            onChange={e => setConditionType(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button onClick={insertAppointment}>Insert Appointment</button>
        </div>
      </div>

      {/* EQUIPMENT */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Equipment</h2>
        <div className="space-y-3">
          <input 
            placeholder="Equipment Name" 
            value={equipmentName} 
            onChange={e => setEquipmentName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button onClick={insertEquipment}>Insert Equipment</button>
        </div>
      </div>

      {/* EQUIPMENT REQUEST */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Equipment Request</h2>
        <div className="space-y-3">
          <input 
            placeholder="Issue Description" 
            value={issueDescription} 
            onChange={e => setIssueDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <button onClick={insertEquipmentRequest}>Insert Equipment Request</button>
        </div>
      </div>

      {/* NOTIFICATION */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Notification</h2>
        <div className="space-y-3">
          <input 
            placeholder="Type" 
            value={notificationType} 
            onChange={e => setNotificationType(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input 
            placeholder="Message" 
            value={message} 
            onChange={e => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button onClick={insertNotification}>Insert Notification</button>
        </div>
      </div>
    </div>
  );
}