import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['fr', 'en']);
    this.translate.setFallbackLang('fr');

    const browserLang = localStorage.getItem('language') || this.translate.getBrowserLang();
    const langToUse = browserLang?.match(/en|fr/) ? browserLang : 'fr';
    this.translate.use(langToUse);
    localStorage.setItem('language', langToUse);
  }
}
