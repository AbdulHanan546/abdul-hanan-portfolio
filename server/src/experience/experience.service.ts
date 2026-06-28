import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience } from './experience.schema';

@Injectable()
export class ExperienceService implements OnModuleInit {
  constructor(
    @InjectModel(Experience.name) private readonly experienceModel: Model<Experience>,
  ) {}

  async onModuleInit() {
    console.log('Seeding experiences...');
    // Clear existing experiences to avoid duplicate/missing seed experiences when count is not 0
    await this.experienceModel.deleteMany({});
    await this.experienceModel.create([
      {
        company: 'GAIRL (Generative AI Research Lab)',
        role: 'Generative AI Intern',
        duration: 'October 2025 - December 2025',
        location: 'Lahore, Punjab, Pakistan',
        bulletPoints: [
          'Gained hands-on expertise in NLP Preprocessing and advanced neural architectures including Transformers, RNNs, GRUs, and LSTMs.',
          'Implemented Agentic AI Frameworks to develop a code reviewer agent that reviews code and provides enhanced code.',
          'Worked on LLM Fine-tuning and optimization to improve model performance for domain-specific applications like patient readmission classifier.',
          'Applied Prompt engineering techniques to build chatbots specific for domain and for general purpose as well.'
        ],
        skillsUsed: ['Generative AI', 'Agentic AI', 'RAG', 'Transformers', 'NLP', 'LLM Fine-tuning', 'Prompt Engineering', 'Langchain']
      },
      {
        company: 'CodeCelix',
        role: 'Full Stack Developer Intern',
        duration: 'August 2025 - October 2025',
        location: 'Pakistan',
        bulletPoints: [
          'Developed TaskBazaar, a service-marketplace platform using React Native, enabling users to upload tasks and service providers to accept them in real-time.',
          'Built and integrated an Intern Automation System that scans emails and triggers automated interview questions via WhatsApp API.',
          'Engineered an AI-based Post Generator utilizing Generative AI to automate social media content creation for business marketing.',
          'Deployed full-stack solutions using the MERN Stack (MongoDB, Express, React, Node.js) with robust admin dashboards.'
        ],
        skillsUsed: ['MERN Stack', 'React Native', 'Node.js', 'Express', 'MongoDB', 'Generative AI', 'WhatsApp API']
      }
    ]);
    console.log('Experiences seeded successfully.');
  }

  async findAll(): Promise<Experience[]> {
    return this.experienceModel.find().sort({ createdAt: -1 }).exec();
  }
}
