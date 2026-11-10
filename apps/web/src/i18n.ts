// Idiomas do site, rotas de cada página e textos fixos da interface.
// O conteúdo do currículo e dos eventos fica em src/data.

export const languages = {
  en: { label: 'EN', htmlLang: 'en' },
  pt: { label: 'PT', htmlLang: 'pt-BR' },
} as const;

export type Lang = keyof typeof languages;

export const routes = {
  resume: { en: '/', pt: '/pt/' },
  events: { en: '/events/', pt: '/pt/eventos/' },
} as const;

export type Page = keyof typeof routes;

export const ui = {
  en: {
    nav: { resume: 'Résumé', events: 'Events' },
    switchLabel: 'Language',
    resume: {
      work: 'Experience',
      education: 'Education',
      research: 'Research',
      publications: 'Publications',
      recognition: 'Recognition',
      skills: 'Skills',
      languages: 'Languages',
      present: 'Present',
    },
    events: {
      title: 'Events',
      eyebrow: 'Talks, conferences & meetups',
      lede: "Stages and crowds I've been in, from BH to the world.",
      index: 'Where',
      eventsCount: (n: number) => `${n} ${n === 1 ? 'event' : 'events'}`,
      readPost: 'Read the full post',
      hidePost: 'Show less',
      links: 'Links',
      share: 'Share',
      copied: 'Link copied',
      with: 'With',
      photo: (i: number, n: number) => `Photo ${i} of ${n}`,
      nextPhoto: 'Next photo',
      backToIndex: 'Back to the map',
    },
  },
  pt: {
    nav: { resume: 'Currículo', events: 'Eventos' },
    switchLabel: 'Idioma',
    resume: {
      work: 'Experiência',
      education: 'Formação',
      research: 'Pesquisa',
      publications: 'Publicações',
      recognition: 'Reconhecimentos',
      skills: 'Habilidades',
      languages: 'Idiomas',
      present: 'Atual',
    },
    events: {
      title: 'Eventos',
      eyebrow: 'Palestras, conferências e meetups',
      lede: 'Palcos e plateias por onde passei, de BH ao mundo.',
      index: 'Onde',
      eventsCount: (n: number) => `${n} ${n === 1 ? 'evento' : 'eventos'}`,
      readPost: 'Ler o post completo',
      hidePost: 'Mostrar menos',
      links: 'Links',
      share: 'Compartilhar',
      copied: 'Link copiado',
      with: 'Com',
      photo: (i: number, n: number) => `Foto ${i} de ${n}`,
      nextPhoto: 'Próxima foto',
      backToIndex: 'Voltar ao mapa',
    },
  },
};
