export declare class ProjectsService {
    private supabase;
    constructor();
    findAll(): Promise<any[]>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
