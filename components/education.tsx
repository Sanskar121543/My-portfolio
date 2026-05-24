'use client'

import { motion } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from './animations'

const education = [
  {
    degree: 'M.S. Computer Science',
    school: 'New York University, Tandon School of Engineering',
    location: 'Brooklyn, NY',
    period: 'Sept 2026 – May 2028',
    focus: ['Distributed Systems', 'ML Systems', 'Advanced ML', 'Big Data'],
  },
  {
    degree: 'B.Tech Computer Science and Engineering',
    school: 'Vellore Institute of Technology',
    location: 'Vellore, India',
    period: 'Sept 2022 – April 2026',
    gpa: '3.63/4.0',
  },
]

export function EducationSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-accent font-mono text-sm tracking-wider mb-4">EDUCATION</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Academic background
          </h2>
        </FadeIn>
        
        <StaggerContainer className="space-y-6" staggerDelay={0.15}>
          {education.map((edu, index) => (
            <StaggerItem key={index}>
              <motion.div 
                className="bg-card border border-border rounded-lg p-6"
                whileHover={{ borderColor: 'oklch(0.72 0.15 195 / 0.3)' }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-accent">{edu.school}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground font-mono text-sm">{edu.period}</span>
                    {edu.gpa && <p className="text-muted-foreground text-sm">GPA: {edu.gpa}</p>}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{edu.location}</p>
                
                {edu.focus && (
                  <div className="flex flex-wrap gap-2">
                    {edu.focus.map((f) => (
                      <span key={f} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-mono">
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export function AchievementsSection() {
  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-accent font-mono text-sm tracking-wider mb-4">ACHIEVEMENTS</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Recognition & competitions
          </h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={0.1}>
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              whileHover={{ borderColor: 'oklch(0.72 0.15 195 / 0.5)' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-mono font-bold shrink-0">
                  4%
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">IMC Prosperity 4 (2026)</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Top 4% Manual Trading, top 6% overall among 18,800+ global teams
                  </p>
                  <p className="text-accent text-sm font-mono">Team: Wolf of All Streets</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <motion.div 
              className="bg-card border border-border rounded-lg p-6"
              whileHover={{ borderColor: 'oklch(0.72 0.15 195 / 0.5)' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">ISRO LPSC Letter of Appreciation</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Recognition from B. Ramprasad, Manager QC for core system development
                  </p>
                  <p className="text-accent text-sm font-mono">Production-ready aerospace X-ray inspection system</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
