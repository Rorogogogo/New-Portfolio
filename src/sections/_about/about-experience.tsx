'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { varFade } from 'src/components/animate';
import TimelineStack from 'src/components/timeline-stack';

const experiences = [
  {
    id: 'ddt-holdings',
    role: 'Full Stack Developer',
    company: 'DDT Holdings',
    period: 'Nov 2024 – Present',
    location: 'Sydney, Australia',
    description: 'Designing and developing commercial-grade export management systems',
    technologies: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'Azure DevOps', 'SignalR'],
    achievements: [
      'Designed microservices using Onion architecture with clean REST APIs',
      'Implemented role-based authentication using Entity Framework Identity and JWT',
      'Built automated email pipeline with Hangfire and Azure Service Bus',
      'Set up secure CI/CD pipelines in Azure DevOps with Key Vault integration',
    ],
    icon: 'material-symbols:rocket-launch',
    color: '#10B981',
  },
  {
    id: 'sam-coach',
    role: 'Full Stack Developing Intern',
    company: 'SAM.Coach',
    period: 'Jan 2024 – May 2024',
    location: 'Sydney, Australia',
    description: 'Engineered scalable CRM platform with comprehensive business modules',
    technologies: ['.NET Blazor', 'MySQL', 'EF Core', 'Azure', 'RESTful APIs', 'Figma'],
    achievements: [
      'Developed key business modules including sales tracking and user management',
      'Designed responsive UIs using Figma following accessibility standards',
      'Led iterative UAT cycles coordinating cross-functional teams',
      'Spearheaded Zoom Marketplace integration and technical documentation',
    ],
    icon: 'material-symbols:code',
    color: '#3B82F6',
  },
  {
    id: 'university-sydney',
    role: 'Student Life Ambassador',
    company: 'University Of Sydney',
    period: 'Feb 2023 – Dec 2024',
    location: 'Sydney, Australia',
    description: 'Delivered personalized support and led campus initiatives',
    technologies: ['Event Management', 'Survey Systems', 'Communications', 'Project Planning'],
    achievements: [
      'Conducted engaging information sessions for prospective students',
      'Led O-Week activities planning and execution with satisfaction surveys',
      'Contributed to university-wide consent campaign and campus improvements',
      'Compiled comprehensive feedback to refine student services',
    ],
    icon: 'material-symbols:school',
    color: '#8B5CF6',
  },
];

export default function AboutExperience() {
  return (
    <TimelineStack items={experiences} />
  );
}