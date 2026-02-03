import { supabase } from './supabase';

export const getBedStatus = async () => {
  return supabase.from('bed_status').select('*');
};

export const updateBedStatus = async (
  id: string,
  data: {
    total_beds?: number;
    available_beds?: number;
    occupied_beds?: number;
  }
) => {
  return supabase.from('bed_status').update(data).eq('id', id);
};