import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

@Injectable()
export class ProjectsService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://tftwkkchdtyqlgjghzbt.supabase.co',
      'sb_publishable_FrRmUdVm_VfNwOGkSz9TsA_aQU_blzV'
    );
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('Project')
      .select('*')
      .order('createdAt', { ascending: false });
    if (error) throw error;
    return data;
  }

  async create(data: any) {
    if (!data.id) data.id = randomUUID();
    data.updatedAt = new Date().toISOString();
    const { data: inserted, error } = await this.supabase
      .from('Project')
      .insert([data])
      .select();
    if (error) throw error;
    return inserted[0];
  }

  async update(id: string, data: any) {
    data.updatedAt = new Date().toISOString();
    const { data: updated, error } = await this.supabase
      .from('Project')
      .update(data)
      .eq('id', id)
      .select();
    if (error) throw error;
    return updated[0];
  }

  async remove(id: string) {
    const { data, error } = await this.supabase
      .from('Project')
      .delete()
      .eq('id', id)
      .select();
    if (error) throw error;
    return data ? data[0] : null;
  }
}
