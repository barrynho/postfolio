import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },
  { path: 'about', loadComponent: () => import('./features/about/about').then(m => m.About) },
  { path: 'portfolio', loadComponent: () => import('./features/portfolio/portfolio').then(m => m.Portfolio) },
  { path: 'skills', loadComponent: () => import('./features/skills/skills').then(m => m.Skills) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact').then(m => m.Contact) },
  { path: 'admin/login', loadComponent: () => import('./features/admin/login/login').then(m => m.Login) },
  { path: 'admin/dashboard', loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.Dashboard) },
  { path: '**', redirectTo: '' }
];
