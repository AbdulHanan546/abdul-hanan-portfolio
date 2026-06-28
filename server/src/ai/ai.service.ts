import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  private readonly resumeData = {
    name: 'Abdul Hanan',
    email: 'abdlhanan987@gmail.com',
    phone: '+92 322 5713987',
    linkedin: 'linkedin.com/in/abdulhanan-8a7220293',
    github: 'github.com/AbdulHanan546',
    education: {
      university: 'University of Engineering and Technology (UET), Lahore',
      degree: 'BS in Computer Science',
      duration: 'Sept 2023 - May 2027',
    },
    skills: {
      languages: ['C', 'C++', 'Python', 'JavaScript', 'TypeScript', 'C#'],
      fullstack: ['React Native', 'MERN Stack (MongoDB, Express, React, Node.js)', 'Next.js', 'TailwindCSS', 'D3.js', 'Django', 'Flask'],
      ai: ['Generative AI', 'LLM Fine-tuning', 'Agentic Framework Langchain', 'NLP', 'Transformers', 'LSTM', 'Scikit-learn'],
    },
    experiences: [
      {
        company: 'GAIRL (Generative AI Research Lab)',
        role: 'Generative AI Intern',
        duration: 'Oct 2025 - Dec 2025',
        details: [
          'Gained hands-on expertise in NLP Preprocessing and advanced neural architectures including Transformers, RNNs, GRUs, and LSTMs.',
          'Implemented Agentic AI Frameworks to develop a code reviewer agent that reviews code and provides enhanced code.',
          'Worked on LLM Fine-tuning and optimization to improve model performance for domain-specific applications like patient readmission classifier.',
          'Applied Prompt engineering techniques to build chatbots specific for domain and for general purpose.'
        ]
      },
      {
        company: 'CodeCelix',
        role: 'Full Stack Developer Intern',
        duration: 'Aug 2025 - Oct 2025',
        details: [
          'Developed TaskBazaar, a service-marketplace platform using React Native, enabling users to upload tasks and service providers to accept them in real-time.',
          'Built and integrated an Intern Automation System that scans emails and triggers automated interview questions via WhatsApp API.',
          'Engineered an AI-based Post Generator utilizing Generative AI to automate social media content creation for business marketing.',
          'Deployed full-stack solutions using the MERN Stack.'
        ]
      }
    ],
    projects: [
      {
        title: 'Quantumverse | Quantum Learning Platform',
        details: [
          'Developed an interactive educational platform covering Waves, Modern Physics, and Quantum Mechanics.',
          'Developed the Simulation Engine, implementing interactive visualizations that allow users to experiment with quantum behaviors.'
        ]
      },
      {
        title: 'Data Structure & Algorithm Visualizer',
        details: [
          'Built a web-based tool to visualize common data structures (Trees, Graphs, Stacks) and algorithms in real-time using D3.js and React.'
        ]
      }
    ]
  };

  async chat(message: string): Promise<string> {
    const msg = message.toLowerCase();

    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('reach')) {
      return `You can reach Abdul Hanan via email at **${this.resumeData.email}** or call him at **${this.resumeData.phone}**. You can also connect on LinkedIn: [linkedin.com/in/abdulhanan-8a7220293](https://${this.resumeData.linkedin}).`;
    }

    if (msg.includes('education') || msg.includes('gpa') || msg.includes('cgpa') || msg.includes('university') || msg.includes('uet')) {
      return `Abdul Hanan is pursuing a **${this.resumeData.education.degree}** at **${this.resumeData.education.university}** (${this.resumeData.education.duration}).`;
    }

    if (msg.includes('experience') || msg.includes('work') || msg.includes('job') || msg.includes('intern') || msg.includes('gairl') || msg.includes('codecelix')) {
      let expResponse = `Abdul has completed two internships:
`;
      this.resumeData.experiences.forEach(exp => {
        expResponse += `\n* **${exp.role}** at **${exp.company}** (${exp.duration}):
`;
        exp.details.forEach(detail => {
          expResponse += `  - ${detail}
`;
        });
      });
      return expResponse;
    }

    if (msg.includes('project') || msg.includes('portfolio') || msg.includes('build') || msg.includes('quantumverse') || msg.includes('visualizer')) {
      let projResponse = `Here are some of Abdul's notable projects:
`;
      this.resumeData.projects.forEach(p => {
        projResponse += `\n* **${p.title}**:
`;
        p.details.forEach(d => {
          projResponse += `  - ${d}
`;
        });
      });
      return projResponse + `\nHe also built this exact MERN + NestJS portfolio website you are interacting with right now!`;
    }

    if (msg.includes('skill') || msg.includes('language') || msg.includes('tech') || msg.includes('stack') || msg.includes('framework')) {
      return `Abdul's tech stack includes:
* **Languages**: ${this.resumeData.skills.languages.join(', ')}
* **Full Stack**: ${this.resumeData.skills.fullstack.join(', ')}
* **AI & Data**: ${this.resumeData.skills.ai.join(', ')}`;
    }

    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
      return `Hello! I am Abdul Hanan's AI Assistant. I can tell you about his skills, education, projects, work experience, or how to contact him. Ask me anything!`;
    }

    // Default response showing options
    return `I'm a specialized AI assistant trained on Abdul Hanan's professional background. I can answer questions about:
1. **Technical Skills** (e.g. "What languages do you know?")
2. **Work Experience** (e.g. "Tell me about your GAIRL internship.")
3. **Featured Projects** (e.g. "What is Quantumverse?")
4. **Education** (e.g. "Where do you study?")
5. **Contact Info** (e.g. "How can I contact Abdul?")

Feel free to ask a specific question!`;
  }
}
