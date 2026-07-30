import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<any[]>;
    create(createProjectDto: any): Promise<any>;
    update(id: string, updateProjectDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
