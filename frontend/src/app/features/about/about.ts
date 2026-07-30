import { Component } from '@angular/core';
import { LucideUser, LucideBook, LucideGraduationCap, LucideAward, LucideMonitor } from '@lucide/angular';

@Component({
  selector: 'app-about',
  imports: [LucideUser, LucideBook, LucideGraduationCap, LucideAward, LucideMonitor],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
}
