import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideUser, LucideBook, LucideGraduationCap, LucideAward } from '@lucide/angular';

@Component({
  selector: 'app-about',
  imports: [CommonModule, LucideUser, LucideBook, LucideGraduationCap, LucideAward],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
}
