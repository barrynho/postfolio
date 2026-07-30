import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  get client() {
    return this.supabase;
  }

  async login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async logout() {
    return this.supabase.auth.signOut();
  }

  async getUser() {
    return this.supabase.auth.getUser();
  }

  // --- CV Management ---
  async uploadCV(file: File) {
    return this.supabase.storage
      .from('portfolio')
      .upload('public/cv.pdf', file, {
        upsert: true,
        cacheControl: '3600',
      });
  }

  async deleteCV() {
    return this.supabase.storage
      .from('portfolio')
      .remove(['public/cv.pdf']);
  }

  getCVUrl(): string {
    const { data } = this.supabase.storage
      .from('portfolio')
      .getPublicUrl('public/cv.pdf', {
        download: 'CV_Mounguengui_Ibinga.pdf'
      });
    return data.publicUrl;
  }
}
