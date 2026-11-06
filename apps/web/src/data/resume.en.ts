import { orgs, type Resume } from './shared';

const resume: Resume = {
  profile: {
    name: 'César de Paula Morais',
    headline: 'Software Engineer',
    location: 'Belo Horizonte, Brazil',
    summary:
      'Software engineer building LLM solutions end to end in Python and TypeScript — agents with tool calling, MCP, and evals, plus RAG — for an 800+ engineer organization. I work directly with founders, user teams, and leadership, give technical talks, and have published ML research.',
    links: [
      { label: 'GitHub', href: 'https://github.com/cesarpmorais' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/cesarpmorais' },
      { label: 'Email', href: 'mailto:cesarpmorais@hotmail.com' },
    ],
  },

  experience: [
    {
      org: { ...orgs.hotmart, description: 'Creator-economy platform' },
      roles: [
        { title: 'Software Engineer', period: 'Sep 2025 – Present' },
        { title: 'Software Engineer Intern', period: 'Oct 2024 – Aug 2025', note: 'Converted to full-time ahead of schedule' },
      ],
      highlights: [
        "Building Launchpad, Hotmart's flagship prompt-to-app AI builder, across front end, back end, and multi-agent architecture (LangGraph, tool calling, MCP, guardrails, evals) — the only non-staff engineer on the team.",
        'Co-built, from a hackathon, an agent platform that turns product specs into production-ready PRs via tool calling, MCP, and evals; as main owner, drove it to 1,000+ merged PRs and a company-wide migration, aligning teams and leadership.',
        'Built from scratch an agentic platform to ship AI-generated apps to production with security and compliance guardrails: 50+ apps live, setup cut from days to minutes.',
        "Co-owned Hotmart's Internal Developer Platform (Backstage, Node.js, React) for 800+ engineers across 50+ teams: shipped full-stack features including RAG-based knowledge search, supported users, reviewed 140+ pull requests, and introduced agile rituals the team still runs.",
        'Technical lead for Launchpad content and community, working directly with founders (meetup with 60+ founders and builders); mentored 3 interns who now lead their own projects.',
      ],
      tags: ['Python', 'TypeScript', 'React', 'AWS', 'LangGraph', 'MCP', 'Evals', 'RAG', 'Backstage'],
    },
    {
      org: { ...orgs.adimplere, description: 'Debt collection platform' },
      roles: [{ title: 'Backend Developer', period: 'Sep 2022 – Sep 2023' }],
      highlights: [
        'Built and integrated backend microservices for billing systems, with automated testing and Docker-based deployments on AWS.',
      ],
      tags: ['Python', 'FastAPI', 'Django', 'Pytest', 'Docker', 'AWS'],
    },
  ],

  education: [
    {
      org: { ...orgs.ufmg, description: 'Universidade Federal de Minas Gerais' },
      roles: [{ title: 'B.Sc. in Computer Science', period: '2021 – Jun 2026' }],
      highlights: [
        'Coursework: Data Structures, Algorithms, Operating Systems, Computer Networks, Software Engineering.',
      ],
    },
  ],

  research: [
    {
      org: { ...orgs.ufmg, description: 'Undergraduate thesis' },
      roles: [{ title: 'Adaptive Bitrate for Cloud Gaming', period: '2026' }],
      advisor: { label: 'Advisor', name: 'Prof. Luiz Filipe Menezes Vieira', url: 'https://dcc.ufmg.br/professor/luiz-filipe-menezes-vieira/' },
      highlights: [
        "Built MACCA, a server-side adaptive bitrate controller for Sunshine (open-source cloud gaming server), adapting TCP CUBIC's congestion control to a 1 Hz, RTT-only loop with no protocol or client changes.",
        'Cut peak RTT by up to 43% and stall time by up to 61% in 5 of 6 emulated network scenarios on real hardware; accepted for oral presentation at SBESC 2026.',
      ],
      tags: ['C++', 'GoogleTest', 'Networking'],
    },
    {
      org: { ...orgs.winet, description: 'Wireless Networks Lab' },
      roles: [{ title: 'Undergraduate Research Assistant', period: 'Sep 2023 – Sep 2024' }],
      highlights: [
        'Built supervised, unsupervised, and neural-network models to detect attacks on 5G core networks (NWDAF), using dimensionality reduction to improve accuracy and efficiency; published at GIIS 2025.',
      ],
      tags: ['Python', 'scikit-learn', 'pandas'],
    },
  ],

  publications: [
    { venue: 'SBESC', year: '2026', text: 'MACCA: adaptive bitrate for cloud gaming — accepted for oral presentation.' },
    { venue: 'GIIS', year: '2025', text: 'Machine learning for attack detection in 5G core networks (NWDAF).' },
  ],

  recognition: [
    "Selected to represent Hotmart at the AI Engineer World's Fair, San Francisco (2026).",
    "Speaker at Hot N'Code (Hotmart's largest engineering conference) and the KubeAI Forum on AWS (2025).",
    'Won a company-wide internal AI hackathon at Hotmart.',
  ],

  skills: [
    { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'C', 'SQL'] },
    { group: 'AI & LLMs', items: ['Agents', 'Multi-agent', 'Tool calling', 'MCP', 'RAG', 'Evals', 'Guardrails', 'Prompt & context engineering'] },
    { group: 'AI frameworks', items: ['LangChain', 'LangGraph', 'Strands Agents', 'Hugging Face', 'Ollama', 'Langfuse', 'Claude Code'] },
    { group: 'Frameworks', items: ['React', 'Node.js', 'FastAPI', 'Django', 'Backstage', 'PostgreSQL'] },
    { group: 'Infra', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'] },
    { group: 'Data & ML', items: ['pandas', 'scikit-learn', 'Neural networks', 'Spark'] },
  ],

  spokenLanguages: ['Portuguese (native)', 'English (fluent)', 'Spanish (intermediate)'],
};

export default resume;
