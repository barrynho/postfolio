import { Component } from '@angular/core';
import { LucideArrowUpRight, LucideQuote, LucideMail, LucidePhone } from '@lucide/angular';

@Component({
  selector: 'app-contact',
  imports: [LucideArrowUpRight, LucideQuote, LucideMail, LucidePhone],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
}
