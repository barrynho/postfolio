import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideUser, LucideBook, LucideGraduationCap, LucideAward } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule, LucideUser, LucideBook, LucideGraduationCap, LucideAward, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
}
