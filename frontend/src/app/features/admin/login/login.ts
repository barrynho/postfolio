import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SupabaseService } from '../../../core/services/supabase.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // Mascot states
  isPasswordFocused = false;
  isError = false;
  isSuccess = false;
  showPassword = false;

  constructor(
    private router: Router, 
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  resetBearState() {
    this.isError = false;
    this.isSuccess = false;
    this.errorMessage = '';
  }

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'LOGIN.REQUIRED';
      this.isError = true;
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.isError = false;
    this.isSuccess = false;

    try {
      // Allow access with the specific credentials requested by user
      if (this.email === 'moustekakawi@gmail.com' && this.password === 'Moungue@12B') {
        this.isLoading = false;
        this.isSuccess = true;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, 2000);
        return;
      }

      const { data, error } = await this.supabaseService.login(this.email, this.password);
      
      if (error) {
        throw error;
      }
      
      this.isLoading = false;
      this.isSuccess = true;
      this.successMessage = 'LOGIN.SUCCESS';
      this.cdr.detectChanges();
      setTimeout(() => {
        this.router.navigate(['/admin/dashboard']);
      }, 2000);
    } catch (error: any) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = "LOGIN.ERROR";
      this.cdr.detectChanges();
    }
  }
}
