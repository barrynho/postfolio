import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideArrowUpRight, LucideDownload } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, LucideArrowUpRight, LucideDownload, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  cvUrl = '/assets/cv.png'; // Fallback

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.cvUrl = this.supabaseService.getCVUrl() || '/assets/cv.png';
  }
}
