import { supabase } from './supabase';

export const getEquipment = async () => {
  return supabase.from('equipment').select('*');
};

export const updateEquipmentStatus = async (
  id: string,
  status: 'available' | 'in_use' | 'maintenance' | 'broken'
) => {
  return supabase.from('equipment').update({ status }).eq('id', id);
};