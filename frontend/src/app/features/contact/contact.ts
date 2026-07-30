import { Component } from '@angular/core';
import { LucideArrowUpRight, LucideQuote, LucideMail, LucidePhone } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [LucideArrowUpRight, LucideQuote, LucideMail, LucidePhone, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
}
