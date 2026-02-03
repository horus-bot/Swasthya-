import { supabase } from './supabase';

export const getEquipmentRequests = async () => {
  return supabase
    .from('equipment_request')
    .select('*, equipment(equipment_name)');
};

export const createEquipmentRequest = async (request: {
  equipment_id: string;
  issue_description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}) => {
  return supabase.from('equipment_request').insert(request);
};

export const updateEquipmentRequestStatus = async (
  id: string,
  status: 'pending' | 'approved' | 'rejected' | 'resolved'
) => {
  return supabase.from('equipment_request').update({ status }).eq('id', id);
};