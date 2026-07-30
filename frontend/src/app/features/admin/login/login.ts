import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = 'moustekakawi@gmail.com';
  password = 'Moungue@12B';
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router, private supabaseService: SupabaseService) {}

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Mock login pour faciliter l'accès
      if (this.email === 'moustekakawi@gmail.com' && this.password === 'Moungue@12B') {
        await new Promise(resolve => setTimeout(resolve, 800));
        this.router.navigate(['/admin/dashboard']);
        return;
      }

      const { data, error } = await this.supabaseService.login(this.email, this.password);
      
      if (error) {
        throw error;
      }
      
      this.router.navigate(['/admin/dashboard']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Une erreur est survenue lors de la connexion.';
    } finally {
      this.isLoading = false;
    }
  }
}
