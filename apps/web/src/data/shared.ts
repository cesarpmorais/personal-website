// Tipos e organizações compartilhados pelas versões do currículo.

import type { ImageMetadata } from 'astro';
import hotmartLogo from '../assets/logos/hotmart.png';
import adimplereLogo from '../assets/logos/adimplere.png';
import ufmgLogo from '../assets/logos/ufmg.png';
import winetLogo from '../assets/logos/winet.png';

export interface Org {
  name: string;
  /** Monograma do ícone blocky, usado quando não há logo. */
  mark: string;
  /** Cor de fundo do ícone blocky. */
  color: string;
  /** Logo em src/assets/logos (substitui o monograma). */
  logo?: ImageMetadata;
  url?: string;
  description?: string;
}

export interface Role {
  title: string;
  period: string;
  note?: string;
}

export interface Entry {
  org: Org;
  roles: Role[];
  /** Orientador, supervisor etc. O rótulo vem traduzido no próprio dado. */
  advisor?: { label: string; name: string; url?: string };
  highlights: string[];
  tags?: string[];
}

export interface Publication {
  venue: string;
  year: string;
  text: string;
}

export interface Resume {
  profile: {
    name: string;
    headline: string;
    location: string;
    summary: string;
    links: { label: string; href: string }[];
  };
  experience: Entry[];
  education: Entry[];
  research: Entry[];
  publications: Publication[];
  recognition: string[];
  skills: { group: string; items: string[] }[];
  spokenLanguages: string[];
}

export const orgs = {
  hotmart: { name: 'Hotmart', mark: 'H', color: '#f04e23', logo: hotmartLogo, url: 'https://hotmart.com' },
  adimplere: { name: 'Adimplere', mark: 'A', color: '#0f9d8a', logo: adimplereLogo },
  ufmg: { name: 'UFMG', mark: 'U', color: '#b3262e', logo: ufmgLogo, url: 'https://ufmg.br' },
  winet: { name: 'WiNET · UFMG', mark: 'W', color: '#3f8f3a', logo: winetLogo, url: 'https://www.winet.dcc.ufmg.br' },
} satisfies Record<string, Org>;
