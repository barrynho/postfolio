import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  isMenuOpen = false;
  isLightMode = false;
  currentLang = 'fr';

  constructor(private translate: TranslateService) {
    this.currentLang = localStorage.getItem('language') || 'fr';
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isLightMode = true;
      document.body.classList.add('light-theme');
    }
  }

  switchLanguage() {
    this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
    this.translate.use(this.currentLang);
    localStorage.setItem('language', this.currentLang);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    if (this.isLightMode) {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }
}
