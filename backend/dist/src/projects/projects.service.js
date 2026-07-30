"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const crypto_1 = require("crypto");
let ProjectsService = class ProjectsService {
    constructor() {
        this.supabase = (0, supabase_js_1.createClient)('https://tftwkkchdtyqlgjghzbt.supabase.co', 'sb_publishable_FrRmUdVm_VfNwOGkSz9TsA_aQU_blzV');
    }
    async findAll() {
        const { data, error } = await this.supabase
            .from('Project')
            .select('*')
            .order('createdAt', { ascending: false });
        if (error)
            throw error;
        return data;
    }
    async create(data) {
        if (!data.id)
            data.id = (0, crypto_1.randomUUID)();
        data.updatedAt = new Date().toISOString();
        const { data: inserted, error } = await this.supabase
            .from('Project')
            .insert([data])
            .select();
        if (error)
            throw error;
        return inserted[0];
    }
    async update(id, data) {
        data.updatedAt = new Date().toISOString();
        const { data: updated, error } = await this.supabase
            .from('Project')
            .update(data)
            .eq('id', id)
            .select();
        if (error)
            throw error;
        return updated[0];
    }
    async remove(id) {
        const { data, error } = await this.supabase
            .from('Project')
            .delete()
            .eq('id', id)
            .select();
        if (error)
            throw error;
        return data ? data[0] : null;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map