import { supabase } from './supabase';

export const getDoctors = async () => {
  return supabase.from('doctor').select('*');
};

export const getAvailableDoctors = async () => {
  return supabase
    .from('doctor')
    .select('*')
    .eq('availability_status', 'available')
    .eq('on_duty', true);
};

export const createDoctor = async (doctor: {
  name: string;
  specialization: string;
  on_duty: boolean;
  availability_status: 'available' | 'busy' | 'off';
}) => {
  return supabase.from('doctor').insert(doctor);
};