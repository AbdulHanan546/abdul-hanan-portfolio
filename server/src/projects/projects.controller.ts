import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './projects.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getAllProjects(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get('featured')
  async getFeaturedProjects(): Promise<Project[]> {
    return this.projectsService.findFeatured();
  }
}
