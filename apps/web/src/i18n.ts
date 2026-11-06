// Idiomas do site e textos fixos da interface (o conteúdo do currículo fica em src/data).

export const languages = {
  en: { label: 'EN', htmlLang: 'en', path: '/' },
  pt: { label: 'PT', htmlLang: 'pt-BR', path: '/pt/' },
} as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    eyebrow: '// resume',
    work: 'Work',
    workTitle: 'Work experience',
    education: 'Education',
    research: 'Research',
    publications: 'Publications',
    recognition: 'Recognition',
    skills: 'Skills',
    switchLabel: 'Language',
  },
  pt: {
    eyebrow: '// currículo',
    work: 'Experiência',
    workTitle: 'Experiência',
    education: 'Formação',
    research: 'Pesquisa',
    publications: 'Publicações',
    recognition: 'Reconhecimentos',
    skills: 'Habilidades',
    switchLabel: 'Idioma',
  },
} satisfies Record<Lang, Record<string, string>>;
