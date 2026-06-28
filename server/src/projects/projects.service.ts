import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './projects.schema';

@Injectable()
export class ProjectsService implements OnModuleInit {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) { }

  async onModuleInit() {
    console.log('Seeding projects...');
    // Clear existing projects to avoid duplicate/missing seed projects when count is not 0
    await this.projectModel.deleteMany({});
    await this.projectModel.create([
      {
        title: 'Quantumverse | Quantum Learning Platform',
        description: 'An interactive educational platform covering Waves, Modern Physics, and Quantum Mechanics.',
        bulletPoints: [
          'Developed the Simulation Engine, implementing interactive visualizations that allow users to experiment with quantum behaviors and bridge the gap between theory and quantum computing.',
          'Collaborated on a multi-modal learning architecture, integrating narrative-driven Story Mode with technical simulation modes.'
        ],
        tags: ['React', 'TypeScript', 'Three.js', 'Next.js', 'D3.js'],
        githubLink: 'https://github.com/m-ans-ishfaq/quantumverse.git',
        featured: true,
      },
      {
        title: 'Data Structure & Algorithm Visualizer',
        description: 'A web-based interactive tool to visualize common data structures and algorithms in real-time.',
        bulletPoints: [
          'Built a web-based tool to visualize common data structures (Trees, Graphs, Stacks) and algorithms in real-time.',
          'Utilized D3.js and React to provide dynamic, step-by-step execution flows to enhance algorithmic understanding.'
        ],
        tags: ['React', 'TypeScript', 'D3.js', 'TailwindCSS'],
        githubLink: 'https://github.com/AbdulHanan546/dsa-visualizer',
        liveDemoLink: 'https://dsa-visualizer-demo.vercel.app',
        featured: true,
      },
      {
        title: 'Cyber Awareness Project',
        description: 'A real-time educational platform delivering cyber security awareness through synchronized student-instructor sessions.',
        bulletPoints: [
          'Designed a synchronized interactive learning session system between instructors and students, allowing real-time presentation control.',
          'Developed instructor controls to dynamically set and manage what slides, topics, or content students view on their screens in real-time.'
        ],
        tags: ['React', 'Node.js', 'Express', 'Socket.io', 'MERN Stack'],
        githubLink: 'https://github.com/AbdulHanan546/Cyber-Awareness',
        featured: true,
      }
    ]);
    console.log('Projects seeded successfully.');
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findFeatured(): Promise<Project[]> {
    return this.projectModel.find({ featured: true }).exec();
  }
}
