"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Code2,
  Cpu,
  Database,
  Send,
  Mail,
  Sparkles,
  ChevronRight,
  Terminal,
  ExternalLink,
  MessageSquare,
  X,
  FileText,
  Download,
  Sun,
  Moon,
  Shield,
  Menu,
} from "lucide-react";

/* ── Custom brand SVG icons ─────────────────────────────────── */
const GithubIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a6 6 0 0 1 6-3z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ── Data Types ─────────────────────────────────────────────── */
interface Project {
  _id: string;
  title: string;
  description: string;
  bulletPoints: string[];
  tags: string[];
  githubLink?: string;
  liveDemoLink?: string;
  featured: boolean;
}

interface Experience {
  _id: string;
  company: string;
  role: string;
  duration: string;
  location?: string;
  bulletPoints: string[];
  skillsUsed: string[];
}

/* ── Static fallback data ───────────────────────────────────── */
const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "p1",
    title: "Quantumverse | Quantum Learning Platform",
    description: "An interactive educational platform covering Waves, Modern Physics, and Quantum Mechanics.",
    bulletPoints: [
      "Developed the Simulation Engine, implementing interactive visualizations that allow users to experiment with quantum behaviors and bridge the gap between theory and quantum computing.",
      "Collaborated on a multi-modal learning architecture, integrating narrative-driven Story Mode with technical simulation modes.",
    ],
    tags: ["React", "TypeScript", "Three.js", "Next.js", "D3.js"],
    githubLink: "https://github.com/m-ans-ishfaq/quantumverse.git",
    featured: true,
  },
  {
    _id: "p2",
    title: "Data Structure & Algorithm Visualizer",
    description: "A web-based interactive tool to visualize common data structures and algorithms in real-time.",
    bulletPoints: [
      "Built a web-based tool to visualize common data structures (Trees, Graphs, Stacks) and algorithms in real-time.",
      "Utilized D3.js and React to provide dynamic, step-by-step execution flows to enhance algorithmic understanding.",
    ],
    tags: ["React", "TypeScript", "D3.js", "TailwindCSS"],
    githubLink: "https://github.com/AbdulHanan546/data-structure-visualizer.git",
    liveDemoLink: "https://data-structures-visualizer-ten.vercel.app/",
    featured: true,
  },
  {
    _id: "p3",
    title: "Cyber Awareness Project",
    description: "A real-time educational platform delivering cyber security awareness through synchronized student-instructor sessions.",
    bulletPoints: [
      "Designed a synchronized interactive learning session system between instructors and students, allowing real-time presentation control.",
      "Developed instructor controls to dynamically set and manage what slides, topics, or content students view on their screens in real-time.",
    ],
    tags: ["React", "Node.js", "Express", "Socket.io", "MERN Stack"],
    githubLink: "https://github.com/AbdulHanan546/Cyber-Awareness",
    featured: true,
  },
  {
    _id: "p4",
    title: "AI Code Reviewing Agent",
    description: "An automated code review agent utilizing Large Language Models to analyze repository changes and provide feedback.",
    bulletPoints: [
      "Implemented model inferencing with DeepSeek-Coder to provide precise syntax, logic, and style improvement suggestions.",
      "Formulated advanced prompt engineering strategies to direct the agent's focus on vulnerability detection and code optimization.",
    ],
    tags: ["Generative AI", "DeepSeek-Coder", "LLM", "Python"],
    featured: true,
  },
  {
    _id: "p5",
    title: "Patient Readmission Classifier",
    description: "A Deep Learning model utilizing Recurrent Neural Networks (RNN) to predict patient readmission rates based on clinical history.",
    bulletPoints: [
      "Preprocessed and trained the classifier model on clean patient datasets, addressing class imbalance and sequence padding.",
      "Implemented Recurrent Neural Networks (RNNs) to capture sequential patterns in clinical history for accurate prediction.",
    ],
    tags: ["Deep Learning", "RNN", "Python", "NLP"],
    featured: true,
  },
  {
    _id: "p6",
    title: "TaskBazaar  Service Marketplace App",
    description: "A cross-platform mobile marketplace enabling users to post tasks and service providers to accept and complete them.",
    bulletPoints: [
      "Developed the mobile application using React Native to offer an intuitive and responsive cross-platform user experience.",
      "Engineered real-time task matching and state updates, integrating a robust REST API backend.",
    ],
    tags: ["React Native", "Node.js", "Express", "MongoDB"],
    githubLink: "https://github.com/AbdulHanan546/Taskbazaar.git",
    featured: true,
  },
];

const FALLBACK_EXPERIENCES: Experience[] = [
  {
    _id: "e1",
    company: "GAIRL — Generative AI Research Lab",
    role: "Generative AI Intern",
    duration: "October 2025 – December 2025",
    location: "Lahore, Punjab, Pakistan",
    bulletPoints: [
      "Gained hands-on expertise in NLP preprocessing and advanced neural architectures including Transformers, RNNs, GRUs, and LSTMs.",
      "Implemented Agentic AI Frameworks to build a code-reviewer agent that analyses and improves code automatically.",
      "Fine-tuned LLMs for domain-specific applications such as a patient readmission classifier.",
      "Applied prompt engineering techniques to build both domain-specific and general-purpose chatbots.",
    ],
    skillsUsed: ["Generative AI", "Agentic AI", "RAG", "Transformers", "NLP", "LLM Fine-tuning", "Prompt Engineering", "LangChain"],
  },
  {
    _id: "e2",
    company: "CodeCelix",
    role: "Full Stack Developer Intern",
    duration: "August 2025 – October 2025",
    location: "Pakistan",
    bulletPoints: [
      "Developed TaskBazaar — a service-marketplace app in React Native enabling real-time task posting & acceptance.",
      "Built an Intern Automation System that scans emails and triggers automated interview questions via WhatsApp API.",
      "Engineered an AI-based Social Post Generator using Generative AI to automate business marketing content.",
      "Deployed full-stack MERN solutions with admin dashboards and robust REST APIs.",
    ],
    skillsUsed: ["MERN Stack", "React Native", "Node.js", "Express", "MongoDB", "Generative AI", "WhatsApp API"],
  },
];

/* ── Animation variants ─────────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ── Tag colour helper ──────────────────────────────────────── */
const tagClass = (tag: string) => {
  const blue = ["React", "Next.js", "TypeScript", "NestJS", "Three.js", "D3.js"];
  const sky = ["Node.js", "Express", "Socket.io", "LangChain", "MongoDB", "MERN Stack"];
  if (blue.some(b => tag.includes(b))) return "chip chip-blue";
  if (sky.some(s => tag.includes(s))) return "chip chip-sky";
  return "chip chip-slate";
};

/* ── URL helper to prevent relative links ───────────────────── */
const ensureAbsoluteUrl = (url?: string) => {
  if (!url) return "";
  if (/^(?:[a-z]+:)?\/\//i.test(url)) return url;
  return `https://${url}`;
};

/* ════════════════════════════════════════════════════════════ */
export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  /* Theme ──────────────────────────────────────────────────── */
  const [dark, setDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  /* Data ───────────────────────────────────────────────────── */
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [experiences, setExperiences] = useState<Experience[]>(FALLBACK_EXPERIENCES);

  useEffect(() => {
    const load = async () => {
      const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
      const hasProdApi = !!process.env.NEXT_PUBLIC_API_URL;
      
      if (!hasProdApi && !isLocalhost) {
        return;
      }
      
      try {
        const [pr, er] = await Promise.all([
          fetch(`${API_BASE}/projects`),
          fetch(`${API_BASE}/experience`),
        ]);
        if (pr.ok) { const d = await pr.json(); if (d.length) setProjects(d); }
        if (er.ok) { const d = await er.json(); if (d.length) setExperiences(d); }
      } catch { /* use fallbacks */ }
    };
    load();
  }, []);

  /* Chat ───────────────────────────────────────────────────── */
  const [chatOpen, setChatOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ sender: "user" | "ai"; text: string }[]>([
    { sender: "ai", text: "Hi! I'm Abdul's AI assistant. Ask me about his skills, experience, projects, or how to contact him." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, chatLoading]);

  const sendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const txt = chatInput.trim();
    if (!txt || chatLoading) return;
    setMsgs(p => [...p, { sender: "user", text: txt }]);
    setChatInput("");
    setChatLoading(true);
    const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    const hasProdApi = !!process.env.NEXT_PUBLIC_API_URL;

    if (!hasProdApi && !isLocalhost) {
      const lower = txt.toLowerCase();
      let reply = "";
      if (lower.includes("skill") || lower.includes("stack"))
        reply = "Abdul specialises in the **MERN Stack**, **Next.js**, **NestJS**, and **Generative AI** (LangChain, RAG, LLM fine-tuning, Agentic AI).";
      else if (lower.includes("experience") || lower.includes("intern"))
        reply = "He interned at **GAIRL** (Generative AI — code-review agents, LLM fine-tuning) and **CodeCelix** (Full Stack — React Native, MERN SaaS, AI automation).";
      else if (lower.includes("project"))
        reply = "His projects include **Quantumverse** (quantum physics simulator), **DSA Visualizer** (D3.js algorithm animations), and a **Cyber Awareness Platform** (real-time WebSocket sessions).";
      else if (lower.includes("contact") || lower.includes("email"))
        reply = "Reach Abdul at **abdlhanan987@gmail.com** or call **+92 322 5713987**.";
      else
        reply = "Ask me about Abdul's **skills**, **experience**, **projects**, or **contact** details!";
      setTimeout(() => {
        setMsgs(p => [...p, { sender: "ai", text: reply }]);
        setChatLoading(false);
      }, 400);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: txt }),
      });
      if (!res.ok) throw new Error();
      const { response } = await res.json();
      setMsgs(p => [...p, { sender: "ai", text: response }]);
    } catch {
      const lower = txt.toLowerCase();
      let reply = "";
      if (lower.includes("skill") || lower.includes("stack"))
        reply = "Abdul specialises in the **MERN Stack**, **Next.js**, **NestJS**, and **Generative AI** (LangChain, RAG, LLM fine-tuning, Agentic AI).";
      else if (lower.includes("experience") || lower.includes("intern"))
        reply = "He interned at **GAIRL** (Generative AI — code-review agents, LLM fine-tuning) and **CodeCelix** (Full Stack — React Native, MERN SaaS, AI automation).";
      else if (lower.includes("project"))
        reply = "His projects include **Quantumverse** (quantum physics simulator), **DSA Visualizer** (D3.js algorithm animations), and a **Cyber Awareness Platform** (real-time WebSocket sessions).";
      else if (lower.includes("contact") || lower.includes("email"))
        reply = "Reach Abdul at **abdlhanan987@gmail.com** or call **+92 322 5713987**.";
      else
        reply = "Ask me about Abdul's **skills**, **experience**, **projects**, or **contact** details!";
      setTimeout(() => setMsgs(p => [...p, { sender: "ai", text: reply }]), 400);
    } finally {
      setChatLoading(false);
    }
  };

  /* Contact form ───────────────────────────────────────────── */
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    const hasProdApi = !!process.env.NEXT_PUBLIC_API_URL;

    if (hasProdApi || isLocalhost) {
      try {
        const res = await fetch(`${API_BASE}/contact`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
      } catch { /* graceful */ }
    }

    setTimeout(() => {
      setFormStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 800);
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }} className="relative flex flex-col min-h-screen transition-colors duration-300 overflow-x-hidden">

      {/* Ambient background glow blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, var(--brand-primary) 0%, transparent 70%)" }} />
      <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[180px] opacity-15 pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, var(--brand-accent) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full blur-[140px] opacity-10 pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, var(--brand-primary) 0%, transparent 70%)" }} />

      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <header style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}
        className="sticky top-0 z-50 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="btn-primary !p-2 !rounded-xl">
              <Brain className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-gradient">Abdul Hanan</span>
              <p style={{ color: "var(--text-muted)" }} className="text-[10px] font-semibold uppercase tracking-widest hidden sm:block">Full Stack AI Developer</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6" style={{ color: "var(--text-secondary)" }}>
            {["About", "Skills", "Experience", "Projects", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm font-medium hover:text-[var(--brand-primary)] transition-colors">
                {link}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a href="https://github.com/AbdulHanan546" target="_blank" rel="noreferrer"
              style={{ color: "var(--text-muted)" }} className="hover:text-[var(--brand-primary)] transition-colors">
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/abdulhanan-8a7220293" target="_blank" rel="noreferrer"
              style={{ color: "var(--text-muted)" }} className="hover:text-[var(--brand-primary)] transition-colors">
              <LinkedinIcon className="h-5 w-5" />
            </a>
            {/* CV Download */}
            <a href="/Abdul_Hanan_CV.pdf" download="Abdul_Hanan_CV.pdf"
              className="btn-ghost !py-2 !px-3 !text-xs hidden sm:inline-flex">
              <Download className="h-3.5 w-3.5" /> CV
            </a>
            {/* Theme Toggle */}
            <button onClick={toggleTheme} aria-label="Toggle theme"
              style={{ background: "var(--bg-card2)", border: "1.5px solid var(--border)", color: "var(--text-secondary)" }}
              className="p-2 rounded-lg hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {/* Hire Me CTA */}
            <a href="#contact" className="btn-primary !py-2 !px-4 !text-xs">
              Hire Me
            </a>
            {/* Mobile Menu Toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle mobile menu"
              style={{ background: "var(--bg-card2)", border: "1.5px solid var(--border)", color: "var(--text-secondary)" }}
              className="p-2 rounded-lg hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all md:hidden z-50">
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden w-full overflow-hidden"
              style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
              <nav className="flex flex-col px-5 py-4 gap-4">
                {["About", "Skills", "Experience", "Projects", "Contact"].map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold hover:text-[var(--brand-primary)] transition-colors py-1.5"
                    style={{ color: "var(--text-secondary)" }}>
                    {link}
                  </a>
                ))}
                <a href="/Abdul_Hanan_CV.pdf" download="Abdul_Hanan_CV.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-ghost !py-2 !px-3 !text-xs inline-flex items-center justify-center gap-2 max-w-xs mt-2">
                  <Download className="h-3.5 w-3.5" /> Download CV
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section id="about" className="max-w-6xl mx-auto px-5 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Text */}
        <motion.div
          variants={stagger} initial="hidden" animate="visible"
          className="flex flex-col gap-6">

          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full max-w-fit text-xs font-semibold badge-available">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Available for Full Stack & Generative AI Roles</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.12]">
            Building the Future with{" "}
            <span className="text-gradient">Full Stack Engineering</span>
            {" & "}
            <span className="text-gradient">Generative AI</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{ color: "var(--text-secondary)" }} className="text-base md:text-lg leading-relaxed max-w-xl">
            I bridge the gap between robust web architecture and cutting-edge intelligence
            specialised in the MERN stack, NestJS, and LLM integrations. I take AI from a Python
            notebook to a fully deployed, production-grade web application.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
            <a href="#projects" className="btn-primary">
              View Projects <ChevronRight className="h-4 w-4" />
            </a>
            <a href="/Abdul_Hanan_CV.pdf" download className="btn-ghost">
              <Download className="h-4 w-4" /> Download CV
            </a>
            <a href="#contact" className="btn-ghost">
              <Mail className="h-4 w-4" /> Contact
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp}
            style={{ borderTop: "1px solid var(--border)" }}
            className="grid grid-cols-2 gap-6 pt-6 mt-2 max-w-md">
            {[
              { val: "2", label: "AI/MERN Internships", color: "#0ea5e9" },
              { val: "5+", label: "Projects Shipped", color: "#6366f1" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold" style={{ color: s.color }}>{s.val}</p>
                <p style={{ color: "var(--text-muted)" }} className="text-[11px] font-semibold uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: .92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .7, ease: "easeOut" }}
          className="flex justify-center lg:justify-end">
          <div className="relative w-72 h-80 md:w-80 md:h-[360px]">
            {/* Decorative blobs */}
            <div className="absolute -top-6 -right-6 w-56 h-56 rounded-full opacity-20 animate-blob"
              style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--brand-accent))" }} />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 rounded-full opacity-15 animate-blob"
              style={{ background: "linear-gradient(135deg, var(--brand-accent), #6366f1)", animationDelay: "3s" }} />

            {/* Photo card */}
            <div className="relative z-10 w-full h-full card overflow-hidden"
              style={{ border: "2px solid var(--border-strong)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photo.jpg" alt="Abdul Hanan" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────── */}
      <section id="skills"
        className="py-20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-10">
            <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
              <p className="section-label flex items-center gap-1.5"><Cpu className="h-3.5 w-3.5" /> Technical Skill Matrix</p>
              <h2 className="text-3xl font-extrabold tracking-tight">Structured Knowledge Base</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Code2 className="h-5 w-5" />, title: "🌐 Full Stack Development",
                  color: "#1d4ed8",
                  groups: [
                    { label: "Frontend", items: ["React.js", "Next.js", "React Native", "Redux", "Tailwind CSS", "D3.js"] },
                    { label: "Backend & APIs", items: ["Node.js", "Express.js", "NestJS", "Django", "Flask", "REST APIs"] },
                    { label: "Databases", items: ["MongoDB", "PostgreSQL", "SQL"] },
                  ],
                },
                {
                  icon: <Brain className="h-5 w-5" />, title: "🤖 Generative AI & ML",
                  color: "#0ea5e9",
                  groups: [
                    { label: "Concepts", items: ["RAG Pipelines", "Prompt Engineering", "Fine-tuning", "Transformers", "NLP", "Tokenisation"] },
                    { label: "Frameworks & LLMs", items: ["LangChain", "OpenAI GPT", "Google Gemini", "Meta Llama", "Claude"] },
                    { label: "Vector DBs", items: ["Pinecone", "ChromaDB"] },
                  ],
                },
                {
                  icon: <Database className="h-5 w-5" />, title: "⚙️ Core CS & Tools",
                  color: "#6366f1",
                  groups: [
                    { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "C++", "C", "C#"] },
                    { label: "Fundamentals", items: ["DSA", "System Design", "DBMS", "OOP", "OS"] },
                    { label: "Tools", items: ["Git / GitHub", "n8n", "Jira", "AWS", "Notion"] },
                  ],
                },
              ].map((cat) => (
                <motion.div key={cat.title} variants={fadeUp}
                  className="card p-6 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl text-white" style={{ background: cat.color }}>
                      {cat.icon}
                    </div>
                    <h3 className="font-bold text-base leading-tight">{cat.title}</h3>
                  </div>
                  {cat.groups.map(g => (
                    <div key={g.label} className="flex flex-col gap-2">
                      <p style={{ color: "var(--text-muted)" }} className="text-[10px] font-bold uppercase tracking-widest">{g.label}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {g.items.map(item => (
                          <span key={item} className="chip">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────────── */}
      <section id="experience" className="py-20 max-w-6xl mx-auto px-5 w-full">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-10">
          <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
            <p className="section-label flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> Professional Journey</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Internship Timeline</h2>
          </motion.div>

          <div className="relative flex flex-col gap-0">
            {/* Vertical track line */}
            <div className="absolute left-5 top-2 bottom-2 w-0.5" style={{ background: "var(--border)" }} />

            <div className="flex flex-col gap-8 ml-16">
              {experiences.map((exp, idx) => (
                <motion.div key={exp._id} variants={fadeUp} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-11 flex items-start pt-1">
                    <div className="w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 shadow-md"
                      style={{ background: idx === 0 ? "var(--brand-primary)" : "var(--brand-accent)", outline: "2.5px solid", outlineColor: idx === 0 ? "var(--brand-primary)" : "var(--brand-accent)", outlineOffset: "2px" }} />
                  </div>

                  <div className="card p-6 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold">{exp.role}</h3>
                        <p className="font-semibold text-sm mt-0.5" style={{ color: "var(--brand-primary)" }}>{exp.company}</p>
                      </div>
                      <div className="sm:text-right flex-shrink-0">
                        <p className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block"
                          style={{ background: "var(--bg-card2)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                          {exp.duration}
                        </p>
                        {exp.location && <p style={{ color: "var(--text-muted)" }} className="text-xs mt-1">{exp.location}</p>}
                      </div>
                    </div>

                    <ul className="flex flex-col gap-2.5">
                      {exp.bulletPoints.map((bp, i) => (
                        <li key={i} className="flex gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                          <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--brand-primary)" }} />
                          {bp}
                        </li>
                      ))}
                    </ul>

                    <div style={{ borderTop: "1px solid var(--border)" }} className="pt-3 flex flex-wrap gap-1.5">
                      {exp.skillsUsed.map(s => (
                        <span key={s} className="chip">{s}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────── */}
      <section id="projects"
        className="py-20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-10">
            <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
              <p className="section-label flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Portfolio Projects</p>
              <h2 className="text-3xl font-extrabold tracking-tight">Featured Work</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj) => {
                const icon =
                  proj.title.toLowerCase().includes("quantum") ? "⚛️" :
                  proj.title.toLowerCase().includes("data") ? "📊" :
                  proj.title.toLowerCase().includes("cyber") ? "🛡️" :
                  proj.title.toLowerCase().includes("review") || proj.title.toLowerCase().includes("agent") ? "🤖" :
                  proj.title.toLowerCase().includes("patient") || proj.title.toLowerCase().includes("classifier") ? "🧠" :
                  proj.title.toLowerCase().includes("taskbazaar") || proj.title.toLowerCase().includes("marketplace") ? "🛍️" : "💡";
                return (
                  <motion.div key={proj._id} variants={fadeUp}
                    className="card flex flex-col overflow-hidden group">
                    {/* Header band */}
                    <div className="px-6 pt-5 pb-4 flex items-start gap-3"
                      style={{ borderBottom: "1px solid var(--border)" }}>
                      <span className="text-3xl mt-0.5">{icon}</span>
                      <h3 className="font-bold text-base leading-tight group-hover:text-[var(--brand-primary)] transition-colors">
                        {proj.title}
                      </h3>
                    </div>

                    <div className="flex flex-col flex-grow gap-4 p-6">
                      <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed">
                        {proj.description}
                      </p>

                      <ul className="flex flex-col gap-2 flex-grow">
                        {proj.bulletPoints.map((bp, i) => (
                          <li key={i} className="flex gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: "var(--brand-accent)" }} />
                            {bp}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.tags.map(t => (
                          <span key={t} className={tagClass(t)}>{t}</span>
                        ))}
                      </div>

                      <div style={{ borderTop: "1px solid var(--border)" }} className="pt-4 flex items-center gap-4">
                        {proj.githubLink && (
                          <a href={ensureAbsoluteUrl(proj.githubLink)} target="_blank" rel="noreferrer"
                            style={{ color: "var(--text-muted)" }}
                            className="flex items-center gap-1.5 text-xs font-semibold hover:text-[var(--brand-primary)] transition-colors">
                            <GithubIcon className="h-4 w-4" /> GitHub
                          </a>
                        )}
                        {proj.liveDemoLink && (
                          <a href={ensureAbsoluteUrl(proj.liveDemoLink)} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs font-semibold ml-auto transition-colors"
                            style={{ color: "var(--brand-accent)" }}>
                            Live Demo <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────── */}
      <section id="contact" className="py-20 max-w-6xl mx-auto px-5 w-full">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Info */}
          <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <p className="section-label flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Get in Touch</p>
              <h2 className="text-3xl font-extrabold tracking-tight">Let's Connect</h2>
            </div>
            <p style={{ color: "var(--text-secondary)" }} className="leading-relaxed text-sm">
              Have an opening, an interesting AI project, or just want to chat about Full Stack
              development and LangChain? I'd love to hear from you.
            </p>

            {[
              { icon: <Mail className="h-5 w-5" />, label: "Email", val: "abdlhanan987@gmail.com", href: "mailto:abdlhanan987@gmail.com", color: "#1d4ed8" },
              { icon: <LinkedinIcon className="h-5 w-5" />, label: "LinkedIn", val: "linkedin.com/in/abdulhanan-8a7220293", href: "https://linkedin.com/in/abdulhanan-8a7220293", color: "#0ea5e9" },
              { icon: <GithubIcon className="h-5 w-5" />, label: "GitHub", val: "github.com/AbdulHanan546", href: "https://github.com/AbdulHanan546", color: "#6366f1" },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl text-white flex-shrink-0" style={{ background: c.color }}>
                  {c.icon}
                </div>
                <div>
                  <p style={{ color: "var(--text-muted)" }} className="text-[10px] font-bold uppercase tracking-widest">{c.label}</p>
                  <a href={c.href} target="_blank" rel="noreferrer"
                    className="text-sm font-medium hover:text-[var(--brand-primary)] transition-colors">
                    {c.val}
                  </a>
                </div>
              </div>
            ))}

            {/* Download CV card */}
            <a href="/Abdul_Hanan_CV.pdf" download
              className="card flex items-center gap-4 p-4 !rounded-xl mt-2 hover:border-[var(--brand-primary)] transition-all group">
              <div className="p-3 rounded-xl" style={{ background: "var(--bg-card2)" }}>
                <FileText className="h-6 w-6" style={{ color: "var(--brand-primary)" }} />
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-sm">Abdul_Hanan_CV.pdf</p>
                <p style={{ color: "var(--text-muted)" }} className="text-xs">Click to download resume</p>
              </div>
              <Download className="h-5 w-5 group-hover:text-[var(--brand-primary)] transition-colors" style={{ color: "var(--text-muted)" }} />
            </a>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <div className="card p-8 !rounded-2xl">
              {formStatus === "success" ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <div className="p-4 rounded-full" style={{ background: "var(--bg-card2)" }}>
                    <Sparkles className="h-8 w-8" style={{ color: "var(--brand-primary)" }} />
                  </div>
                  <h3 className="text-xl font-bold">Message Sent!</h3>
                  <p style={{ color: "var(--text-secondary)" }} className="text-sm max-w-xs">
                    Thanks for reaching out. Abdul will get back to you shortly.
                  </p>
                  <button onClick={() => setFormStatus("idle")} className="btn-ghost !mt-3">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={submitContact} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label style={{ color: "var(--text-muted)" }} className="text-xs font-bold uppercase tracking-widest">Name</label>
                      <input required className="input-field" placeholder="e.g. John Doe"
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label style={{ color: "var(--text-muted)" }} className="text-xs font-bold uppercase tracking-widest">Email</label>
                      <input required type="email" className="input-field" placeholder="john@example.com"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label style={{ color: "var(--text-muted)" }} className="text-xs font-bold uppercase tracking-widest">Message</label>
                    <textarea required rows={5} className="input-field resize-none"
                      placeholder="Hi Abdul, I'd like to discuss..."
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit" disabled={formStatus === "sending"} className="btn-primary w-full justify-center py-3 !rounded-xl">
                    {formStatus === "sending" ? "Sending…" : "Send Message"}
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}
        className="py-7 mt-auto transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4" style={{ color: "var(--brand-primary)" }} />
            <span>© 2026 Abdul Hanan. All rights reserved.</span>
          </div>
          <span>Built with TypeScript</span>
        </div>
      </footer>

      {/* ── FLOATING AI CHAT ────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: .95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: .95 }}
              transition={{ duration: .22 }}
              className="w-80 md:w-96 h-[460px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: "var(--bg-card)", border: "1.5px solid var(--border-strong)" }}>

              {/* Header */}
              <div className="px-4 py-3 flex items-center justify-between text-white"
                style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--brand-accent))" }}>
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">AI Assistant</p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="opacity-80 hover:opacity-100 transition-opacity">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-3" style={{ background: "var(--bg)" }}>
                {msgs.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[82%] text-xs leading-relaxed px-3.5 py-2.5 rounded-2xl ${m.sender === "user"
                      ? "text-white rounded-tr-sm"
                      : "rounded-tl-sm"
                      }`}
                      style={m.sender === "user"
                        ? { background: "var(--brand-primary)" }
                        : { background: "var(--bg-card2)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm flex gap-1.5 items-center"
                      style={{ background: "var(--bg-card2)", border: "1px solid var(--border)" }}>
                      {[0, 150, 300].map(d => (
                        <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ background: "var(--brand-primary)", animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={chatEnd} />
              </div>

              {/* Input */}
              <form onSubmit={sendChat} className="p-3 flex gap-2"
                style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask me anything…" className="input-field !py-2 !text-xs flex-grow" />
                <button type="submit" disabled={chatLoading} className="btn-primary !p-2 !rounded-xl flex-shrink-0">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle bubble */}
        <motion.button
          onClick={() => setChatOpen(p => !p)}
          whileHover={{ scale: 1.07 }} whileTap={{ scale: .95 }}
          className="btn-primary !p-3.5 !rounded-2xl shadow-xl relative"
          aria-label="Open AI assistant">
          {chatOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
          {!chatOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white animate-pulse" />
          )}
        </motion.button>
      </div>

    </div>
  );
}
