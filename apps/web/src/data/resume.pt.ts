import { orgs, type Resume } from './shared';

const resume: Resume = {
  profile: {
    name: 'César de Paula Morais',
    headline: 'Engenheiro de Software',
    location: 'Belo Horizonte, MG',
    summary:
      'Engenheiro de software que constrói soluções com LLMs de ponta a ponta em Python e TypeScript: agentes com tool calling, MCP e evals, além de RAG, para uma organização com mais de 800 engenheiros. Atuação direta com founders, times usuários e liderança, palestras técnicas e pesquisa publicada em ML.',
    links: [
      { label: 'GitHub', href: 'https://github.com/cesarpmorais' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/cesarpmorais' },
      { label: 'E-mail', href: 'mailto:cesarpmorais@hotmail.com' },
    ],
  },

  experience: [
    {
      org: { ...orgs.hotmart, description: 'Plataforma da economia dos criadores' },
      roles: [
        { title: 'Software Engineer', period: 'set. 2025 – atual' },
        { title: 'Software Engineer Intern', period: 'out. 2024 – ago. 2025', note: 'Efetivado antes do prazo previsto' },
      ],
      highlights: [
        'Desenvolvo o Launchpad, principal AI builder prompt-to-app da Hotmart, em front-end, back-end e arquitetura multi-agente (LangGraph, tool calling, MCP, guardrails, evals); único engenheiro abaixo de staff no time.',
        'Cocriei, a partir de um hackathon, uma plataforma de agentes que transforma especificações de produto em PRs prontos para produção via tool calling, MCP e evals; como main owner, levei a mais de 1.000 PRs mergeados e a uma migração na empresa toda, alinhando times e liderança.',
        'Construí do zero uma plataforma agêntica para publicar em produção apps gerados por IA, com guardrails de segurança e compliance: mais de 50 apps no ar e setup de dias para minutos.',
        'Co-owner da Internal Developer Platform da Hotmart (Backstage, Node.js, React), para mais de 800 engenheiros em mais de 50 times: entreguei funcionalidades full-stack, incluindo busca de conhecimento com RAG, apoiei usuários, revisei mais de 140 PRs e introduzi ritos ágeis que o time mantém até hoje.',
        'Lidero tecnicamente o conteúdo e a comunidade do Launchpad, em contato direto com founders (meetup com mais de 60 founders e builders), e mentorei 3 estagiários que hoje lideram projetos próprios.',
      ],
      tags: ['Python', 'TypeScript', 'React', 'AWS', 'LangGraph', 'MCP', 'Evals', 'RAG', 'Backstage'],
    },
    {
      org: { ...orgs.adimplere, description: 'Plataforma de cobrança' },
      roles: [{ title: 'Backend Developer', period: 'set. 2022 – set. 2023' }],
      highlights: ['Construí microsserviços de cobrança com testes automatizados e deploys com Docker na AWS.'],
      tags: ['Python', 'FastAPI', 'Django', 'Pytest', 'Docker', 'AWS'],
    },
  ],

  education: [
    {
      org: { ...orgs.ufmg, description: 'Universidade Federal de Minas Gerais' },
      roles: [{ title: 'Bacharelado em Ciência da Computação', period: '2021 – jun. 2026' }],
      highlights: [
        'Disciplinas: Estruturas de Dados, Algoritmos, Sistemas Operacionais, Redes de Computadores, Engenharia de Software.',
      ],
    },
  ],

  research: [
    {
      org: { ...orgs.ufmg, description: 'Trabalho de conclusão de curso' },
      roles: [{ title: 'Bitrate adaptativo para cloud gaming', period: '2026' }],
      advisor: { label: 'Orientador', name: 'Prof. Luiz Filipe Menezes Vieira', url: 'https://dcc.ufmg.br/professor/luiz-filipe-menezes-vieira/' },
      highlights: [
        'Desenvolvi o MACCA, controlador de bitrate adaptativo para o Sunshine, servidor open source de cloud gaming, adaptando o TCP CUBIC a um loop de 1 Hz só com RTT, sem mudar protocolo ou cliente.',
        'Reduzi o pico de RTT em até 43% e o tempo de travamento em até 61% em 5 de 6 cenários de rede emulados em hardware real; aceito para apresentação oral no SBESC 2026.',
      ],
      tags: ['C++', 'GoogleTest', 'Redes'],
    },
    {
      org: { ...orgs.winet, description: 'Laboratório de Redes Sem Fio' },
      roles: [{ title: 'Iniciação científica', period: 'set. 2023 – set. 2024' }],
      highlights: [
        'Construí modelos supervisionados, não supervisionados e redes neurais para detectar ataques em redes centrais 5G (NWDAF), publicado no GIIS 2025.',
      ],
      tags: ['Python', 'scikit-learn', 'pandas'],
    },
  ],

  publications: [
    { venue: 'SBESC', year: '2026', text: 'MACCA: bitrate adaptativo para cloud gaming — aceito para apresentação oral.' },
    { venue: 'GIIS', year: '2025', text: 'Machine learning para detecção de ataques em redes centrais 5G (NWDAF).' },
  ],

  recognition: [
    "Selecionado para representar a Hotmart na AI Engineer World's Fair, em São Francisco (2026).",
    "Palestrante no Hot N'Code (conferência de engenharia da Hotmart) e no KubeAI Forum on AWS (2025).",
    'Vencedor de um hackathon interno de IA aberto a toda a Hotmart.',
  ],

  skills: [
    { group: 'Linguagens', items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'C', 'SQL'] },
    { group: 'IA e LLMs', items: ['Agentes', 'Multi-agente', 'Tool calling', 'MCP', 'RAG', 'Evals', 'Guardrails', 'Prompt/context engineering'] },
    { group: 'Frameworks de IA', items: ['LangChain', 'LangGraph', 'Strands Agents', 'Hugging Face', 'Ollama', 'Langfuse', 'Claude Code'] },
    { group: 'Frameworks', items: ['React', 'Node.js', 'FastAPI', 'Django', 'Backstage', 'PostgreSQL'] },
    { group: 'Infra', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'] },
    { group: 'Dados e ML', items: ['pandas', 'scikit-learn', 'Redes neurais', 'Spark'] },
  ],

  spokenLanguages: ['Português (nativo)', 'Inglês (fluente)', 'Espanhol (intermediário)'],
};

export default resume;
