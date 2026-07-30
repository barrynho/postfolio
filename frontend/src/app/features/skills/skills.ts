import { Component } from '@angular/core';

interface Skill {
  name: string;
  percentage: number;
  iconClass: string;
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  skills: Skill[] = [
    { name: 'HTML', percentage: 95, iconClass: 'devicon-html5-plain colored' },
    { name: 'CSS', percentage: 90, iconClass: 'devicon-css3-plain colored' },
    { name: 'JavaScript', percentage: 85, iconClass: 'devicon-javascript-plain colored' },
    { name: 'Angular', percentage: 80, iconClass: 'devicon-angularjs-plain colored' },
    { name: 'Flutter', percentage: 75, iconClass: 'devicon-flutter-plain colored' },
    { name: 'Laravel', percentage: 80, iconClass: 'devicon-laravel-original colored' },
    { name: 'Symfony', percentage: 70, iconClass: 'devicon-symfony-original colored' },
    { name: 'MySQL', percentage: 85, iconClass: 'devicon-mysql-plain colored' },
    { name: 'PostgreSQL', percentage: 80, iconClass: 'devicon-postgresql-plain colored' },
    { name: 'Firebase', percentage: 75, iconClass: 'devicon-firebase-plain colored' },
    { name: 'Supabase', percentage: 70, iconClass: 'devicon-supabase-plain colored' },
    { name: 'Git', percentage: 85, iconClass: 'devicon-git-plain colored' }
  ];
}
