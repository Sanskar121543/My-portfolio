'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, Linkedin, Mail, FileText, ExternalLink, ArrowUpRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from './animations'

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f24_1px,transparent_1px),linear-gradient(to_bottom,#1f1f24_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
      
      {/* Gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div style={{ opacity, y }} className="relative z-10 max-w-4xl mx-auto text-center">
        <FadeIn delay={0.1}>
          <p className="text-accent font-mono text-sm tracking-wider mb-6">
            MS Computer Science @ NYU Tandon
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Sanskar</span>{' '}
            <span className="text-muted-foreground">Shimpi</span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Building{' '}
            <span className="text-foreground font-medium">distributed systems</span>,{' '}
            <span className="text-foreground font-medium">ML pipelines</span>, and{' '}
            <span className="text-foreground font-medium">scalable infrastructure</span>.
            Open source contributor to MLflow, Airflow, LangChain, and FastAPI.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link 
              href="https://github.com/Sanskar121543" 
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </Link>
            <Link 
              href="https://linkedin.com/in/sanskar0153" 
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </Link>
            <Link 
              href="mailto:sanskar.shimpi@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </Link>
          </div>
        </FadeIn>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export function AboutSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-accent font-mono text-sm tracking-wider mb-4">ABOUT</p>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 gap-12">
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              I build systems that scale and ML pipelines that learn.
            </h2>
          </FadeIn>
          
          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground leading-relaxed">
                Currently pursuing my Master&apos;s in Computer Science at NYU Tandon, focusing on 
                Distributed Systems, ML Systems, and Big Data. Previously worked as a Research Engineer 
                at ISRO-VIT, building production-ready computer vision systems for aerospace applications.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground leading-relaxed">
                I believe in writing code that matters — contributing to open source projects that 
                thousands of developers rely on daily. My work spans from low-latency backend systems 
                to sophisticated ML drift detection engines.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

const experiences = [
  {
    role: 'Research Engineer, Computer Vision',
    company: 'ISRO–VIT Collaborative Research Program',
    location: 'Vellore, India',
    period: 'Jan 2025 – Jun 2026',
    highlights: [
      'YOLOv8 defect detection for radiographic weld inspection: mAP@0.5 = 0.883, precision 0.890, F1 0.86',
      '70/15/15 stratified augmentation pipeline with MySQL-backed inspection traceability',
      'ISRO LPSC Letter of Appreciation for core system development on production-ready aerospace X-ray inspection system',
    ],
    tech: ['YOLOv8', 'Python', 'MySQL', 'Computer Vision'],
  },
  {
    role: 'Backend Developer Intern',
    company: 'Acumen Advertising DMCC',
    location: 'Dubai, UAE',
    period: 'Jun 2024 – Jul 2024',
    highlights: [
      'JWT auth layer for VoucherSkout payment integrations (Samsung Pay, Noon Pay, Emirates NBD)',
      'Reduced p50 latency 30% (200→150 ms) and error rate 40% across 2K+ daily transactions',
      'Raised unit-test coverage from near-zero to 70% on payment microservices',
    ],
    tech: ['Node.js', 'JWT', 'Microservices', 'Payment APIs'],
  },
]

export function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-accent font-mono text-sm tracking-wider mb-4">EXPERIENCE</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Where I&apos;ve worked
          </h2>
        </FadeIn>
        
        <StaggerContainer className="space-y-4" staggerDelay={0.1}>
          {experiences.map((exp, index) => (
            <StaggerItem key={index}>
              <motion.div 
                className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                whileHover={{ borderColor: 'oklch(0.72 0.15 195 / 0.3)' }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <span className="text-muted-foreground font-mono text-sm">{exp.period}</span>
                  </div>
                  <p className="text-accent">{exp.company}</p>
                  <p className="text-muted-foreground text-sm">{exp.location}</p>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: expandedIndex === index ? 'auto' : 0, opacity: expandedIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="text-accent mt-1.5">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

const projects = [
  {
    title: 'DriftSentinel',
    description: '5-method consensus drift engine with LLM-powered root cause diagnosis. 9× faster MTTD than baseline with cost-aware retraining router.',
    tech: ['Python', 'Kafka', 'Spark', 'MLflow', 'Docker', 'Kubernetes', 'AWS'],
    metrics: ['0.45-hr MTTD', '9× faster', '100% accuracy'],
    github: 'https://github.com/Sanskar121543',
  },
  {
    title: 'AgentMemOS',
    description: '4-tier LLM memory OS with gRPC data plane achieving 5,537 req/s at 1.66ms avg latency. Multi-agent isolation via OPA.',
    tech: ['Python', 'gRPC', 'Redis', 'Pinecone', 'Neo4j', 'PostgreSQL', 'OPA'],
    metrics: ['5,537 req/s', 'P95 2.23ms', '4-tier memory'],
    github: 'https://github.com/Sanskar121543',
  },
  {
    title: 'LineageIQ',
    description: 'Column-level data lineage across dbt, Spark, SQL, and Kafka. LLM-powered NLP→Cypher translation with React Flow DAG visualization.',
    tech: ['Python', 'FastAPI', 'Neo4j', 'Kafka', 'PostgreSQL', 'Redis', 'React'],
    metrics: ['1,389 req/s', '0% error rate', 'P95 44ms'],
    github: 'https://github.com/Sanskar121543',
  },
]

export function ProjectsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-accent font-mono text-sm tracking-wider mb-4">PROJECTS</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Selected work
          </h2>
        </FadeIn>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {projects.map((project, index) => (
            <StaggerItem key={index}>
              <motion.div 
                className="group bg-card border border-border rounded-lg p-6 h-full flex flex-col"
                whileHover={{ 
                  borderColor: 'oklch(0.72 0.15 195 / 0.5)',
                  y: -4,
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <Link href={project.github} target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.metrics.map((metric) => (
                    <span key={metric} className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-mono">
                      {metric}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="text-muted-foreground text-xs font-mono">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-muted-foreground text-xs font-mono">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

const contributions = [
  {
    repo: 'MLflow',
    pr: '#23147',
    description: 'Feature: optional artifact_path in log_model_artifact API',
    lines: '+103',
    url: 'https://github.com/mlflow/mlflow/pull/23147',
  },
  {
    repo: 'Apache Airflow',
    pr: '#66648',
    description: 'Tests: FAB auth manager flash message HTML-escaping regression suite',
    lines: '+64',
    url: 'https://github.com/apache/airflow/pull/66648',
  },
  {
    repo: 'LangChain-Neo4j',
    pr: '#119',
    description: 'Bug fix: replaced deprecated APOC apoc.create.addLabels with native Cypher',
    lines: 'merged',
    url: 'https://github.com/langchain-ai/langchain-neo4j/pull/119',
  },
  {
    repo: 'FastAPI',
    pr: '#15496',
    description: 'Docs: clarified Required/Optional query parameter validation',
    lines: '25/25 CI',
    url: 'https://github.com/tiangolo/fastapi/pull/15496',
  },
]

export function OpenSourceSection() {
  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-accent font-mono text-sm tracking-wider mb-4">OPEN SOURCE</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Contributing to tools developers rely on
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            I believe in giving back to the community. Here are some of my contributions to widely-used open source projects.
          </p>
        </FadeIn>
        
        <StaggerContainer className="grid md:grid-cols-2 gap-4" staggerDelay={0.1}>
          {contributions.map((contrib, index) => (
            <StaggerItem key={index}>
              <Link href={contrib.url} target="_blank">
                <motion.div 
                  className="bg-card border border-border rounded-lg p-5 group"
                  whileHover={{ 
                    borderColor: 'oklch(0.72 0.15 195 / 0.5)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold group-hover:text-accent transition-colors">{contrib.repo}</span>
                      <span className="text-muted-foreground font-mono text-sm">{contrib.pr}</span>
                    </div>
                    <span className="text-accent font-mono text-sm">{contrib.lines}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{contrib.description}</p>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

const skills = {
  'Languages': ['Python', 'C++', 'SQL'],
  'ML & AI': ['PyTorch', 'TensorFlow', 'scikit-learn', 'MLflow', 'SHAP', 'YOLOv8', 'Pinecone', 'RAG', 'LangChain', 'LLMs', 'CNNs'],
  'Systems & Backend': ['FastAPI', 'gRPC', 'Kafka', 'Spark', 'Redis', 'Neo4j', 'PostgreSQL', 'Microservices'],
  'MLOps & DevOps': ['Airflow', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'CI/CD', 'GitHub Actions', 'AWS', 'OPA'],
  'Foundations': ['Distributed Systems', 'System Design', 'Algorithms & DS', 'Linux', 'Git'],
}

export function SkillsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-accent font-mono text-sm tracking-wider mb-4">SKILLS</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Technical expertise
          </h2>
        </FadeIn>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {Object.entries(skills).map(([category, items]) => (
            <StaggerItem key={category}>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-accent">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="text-accent font-mono text-sm tracking-wider mb-4">CONTACT</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Let&apos;s build something together
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Currently looking for full-time opportunities in Software Engineering and ML Engineering. 
            Open to discussing interesting problems.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
            <Link 
              href="mailto:sanskar.shimpi@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              <Mail className="w-5 h-5" />
              Get in touch
            </Link>
            <Link 
              href="https://medium.com/@sanskar.shimpi"
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <FileText className="w-5 h-5" />
              Read my writing
            </Link>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <div className="flex items-center justify-center gap-6">
            <Link href="https://github.com/Sanskar121543" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-6 h-6" />
            </Link>
            <Link href="https://linkedin.com/in/sanskar0153" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link href="mailto:sanskar.shimpi@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-6 h-6" />
            </Link>
            <Link href="https://medium.com/@sanskar.shimpi" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
              <FileText className="w-6 h-6" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Sanskar Shimpi. Built with Next.js.
        </p>
        <p className="text-muted-foreground text-sm font-mono">
          New York, NY · F-1 · OPT Eligible May 2028
        </p>
      </div>
    </footer>
  )
}
