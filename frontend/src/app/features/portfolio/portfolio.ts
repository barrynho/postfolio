import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideArrowRight } from '@lucide/angular';
import { ProjectsApiService } from '../../core/services/projects.service';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, LucideArrowRight],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class Portfolio implements OnInit {
  projects: Project[] = [];
  isLoading = true;

  constructor(
    private projectsService: ProjectsApiService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      this.projects = await this.projectsService.getProjects();
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
