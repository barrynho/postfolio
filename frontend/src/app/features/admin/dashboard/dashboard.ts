import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SupabaseService } from '../../../core/services/supabase.service';
import { ProjectsApiService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  activeTab = 'projects';
  cvFile: File | null = null;
  isUploadingCV = false;
  cvUrl: string | null = null;
  showAddForm = false;
  isSubmitting = false;
  isEditing = false;
  editingProjectId: string | null = null;
  projects: any[] = [];
  
  newProject = {
    title: '',
    demoUrl: '',
    description: '',
    image: null as File | null
  };

  constructor(
    private router: Router, 
    private supabaseService: SupabaseService,
    private projectsService: ProjectsApiService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.loadProjects();
    this.cvUrl = this.supabaseService.getCVUrl();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onCVFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.cvFile = file;
    } else {
      alert('Veuillez sélectionner un fichier PDF.');
      event.target.value = ''; // Reset file input
    }
  }

  async uploadCV() {
    if (!this.cvFile) return;
    this.isUploadingCV = true;
    try {
      await this.supabaseService.uploadCV(this.cvFile);
      this.cvUrl = this.supabaseService.getCVUrl();
      // append query param to bypass cache
      this.cvUrl = `${this.cvUrl}?t=${new Date().getTime()}`;
      alert('CV mis à jour avec succès !');
      this.cvFile = null;
    } catch (error: any) {
      alert('Erreur: ' + error.message);
    } finally {
      this.isUploadingCV = false;
      this.cdr.detectChanges();
    }
  }

  async deleteCV() {
    if (confirm('Voulez-vous vraiment supprimer votre CV ?')) {
      try {
        await this.supabaseService.deleteCV();
        this.cvUrl = null;
        alert('CV supprimé avec succès !');
      } catch (e: any) {
        alert('Erreur lors de la suppression: ' + e.message);
      }
      this.cdr.detectChanges();
    }
  }

  async loadProjects() {
    try {
      this.projects = await this.projectsService.getProjects();
    } catch (error) {
      console.error('Failed to load projects', error);
    } finally {
      this.cdr.detectChanges();
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newProject = { title: '', demoUrl: '', description: '', image: null };
    this.isEditing = false;
    this.editingProjectId = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newProject.image = file;
    }
  }

  startEdit(project: any) {
    this.isEditing = true;
    this.editingProjectId = project.id;
    this.newProject = {
      title: project.title,
      demoUrl: project.demoUrl,
      description: project.description,
      image: null
    };
    this.showAddForm = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async deleteProject(id: string) {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      try {
        await this.projectsService.deleteProject(id);
        await this.loadProjects();
        alert('Projet supprimé avec succès !');
      } catch (e: any) {
        alert('Erreur lors de la suppression: ' + e.message);
      }
    }
  }

  async logout() {
    await this.supabaseService.logout();
    this.router.navigate(['/']);
  }

  async onSubmit() {
    if (!this.isEditing && !this.newProject.image) {
      alert("Veuillez sélectionner une image pour le projet.");
      return;
    }

    this.isSubmitting = true;
    
    try {
      let imageUrl = null;
      if (this.newProject.image) {
        const uploadResult = await this.projectsService.uploadImage(this.newProject.image);
        imageUrl = uploadResult.url;
      }

      const projectData: any = {
        title: this.newProject.title,
        description: this.newProject.description,
        demoUrl: this.newProject.demoUrl
      };

      if (imageUrl) {
        projectData.image = imageUrl;
      }

      if (this.isEditing && this.editingProjectId) {
        await this.projectsService.updateProject(this.editingProjectId, projectData);
        alert('Projet mis à jour avec succès !');
      } else {
        await this.projectsService.createProject(projectData);
        alert('Projet ajouté avec succès !');
      }
      
      this.showAddForm = false;
      this.resetForm();
      await this.loadProjects();

    } catch (error: any) {
      console.error(error);
      alert('Erreur lors de la sauvegarde: ' + error.message);
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }
}
