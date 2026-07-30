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
}
