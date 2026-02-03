import { supabase } from './supabase';

export const getAppointments = async () => {
  return supabase
    .from('appointment')
    .select('*, doctor(name, specialization)');
};

export const createAppointment = async (appointment: {
  doctor_id: string;
  patient_name: string;
  condition_type: string;
  appointment_time: string;
}) => {
  return supabase.from('appointment').insert(appointment);
};

export const updateAppointmentStatus = async (
  id: string,
  status: 'scheduled' | 'completed' | 'cancelled'
) => {
  return supabase.from('appointment').update({ status }).eq('id', id);
};