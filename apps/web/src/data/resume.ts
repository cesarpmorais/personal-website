// Currículo por idioma. O design mora nos componentes; aqui só tem dados.
// Tipos e organizações: shared.ts. Conteúdo: resume.en.ts e resume.pt.ts.
// Base: ~/cesar/resume/Resume - 20261028.html (EN) e Resume - 20261102a (PT, mais recente).

import type { Lang } from '../i18n';
import type { Resume } from './shared';
import en from './resume.en';
import pt from './resume.pt';

export type { Entry, Org, Publication, Resume, Role } from './shared';

export const resumes: Record<Lang, Resume> = { en, pt };
