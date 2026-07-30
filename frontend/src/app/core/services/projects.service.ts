import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsApiService {
  constructor(private supabase: SupabaseService) {}

  async getProjects() {
    const { data, error } = await this.supabase.client
      .from('Project')
      .select('*')
      .order('createdAt', { ascending: false });
    if (error) {
      console.error('Supabase getProjects error:', error);
      throw error;
    }
    return data || [];
  }

  async createProject(project: any) {
    if (!project.id) {
      // Create a random UUID if it's missing so Supabase doesn't complain about null id
      project.id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    project.updatedAt = new Date().toISOString();
    
    const { data, error } = await this.supabase.client
      .from('Project')
      .insert([project])
      .select();
    if (error) {
      console.error('Supabase createProject error:', error);
      throw error;
    }
    return data ? data[0] : null;
  }

  async uploadImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `project-images/${fileName}`;

    const { error: uploadError } = await this.supabase.client.storage
      .from('portfolio')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = this.supabase.client.storage
      .from('portfolio')
      .getPublicUrl(filePath);

    return { url: data.publicUrl };
  }

  async updateProject(id: string, project: any) {
    project.updatedAt = new Date().toISOString();
    const { data, error } = await this.supabase.client
      .from('Project')
      .update(project)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data ? data[0] : null;
  }

  async deleteProject(id: string) {
    const { data, error } = await this.supabase.client
      .from('Project')
      .delete()
      .eq('id', id)
      .select();
    if (error) throw error;
    return data ? data[0] : null;
  }
}
