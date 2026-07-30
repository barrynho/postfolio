import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideArrowUpRight, LucideDownload } from '@lucide/angular';

@Component({
  selector: 'app-home',
  imports: [RouterModule, LucideArrowUpRight, LucideDownload],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
}
