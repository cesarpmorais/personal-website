// Lê os eventos de src/content/events (um index.md + fotos por pasta) e as cidades de src/content/cities.yaml.
// Para adicionar ou editar eventos, mexa só nessas pastas — veja src/content/events/README.md.

import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';

type Text = Record<Lang, string>;

export type Role = 'speaker' | 'participant' | 'organizer' | 'winner';

export const roleLabels: Record<Role, Text> = {
  speaker: { en: 'Speaker', pt: 'Speaker' },
  participant: { en: 'Attendee', pt: 'Participante' },
  organizer: { en: 'Host', pt: 'Organizador' },
  winner: { en: '1st place', pt: '1º lugar' },
};

export interface City {
  id: string;
  name: Text;
  short: string;
  lat: number;
  lon: number;
}

export interface EventItem {
  slug: string;
  name: Text;
  /** O que eu falei / fiz ali, em uma linha. */
  title: Text;
  /** Datas ISO (AAAA-MM-DD); `end` para eventos de vários dias. */
  start: string;
  end?: string;
  city: City;
  venue?: Text;
  roles: Role[];
  with?: string[];
  /** O post, em parágrafos. */
  post: Record<Lang, string[]>;
  links: { label: Text; url: string }[];
  photos: ImageMetadata[];
}

// Todas as fotos que estão nas pastas dos eventos, agrupadas pela pasta.
const photoModules = import.meta.glob<{ default: ImageMetadata }>('../content/events/*/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}', {
  eager: true,
});
const photosOf = (slug: string) =>
  Object.entries(photoModules)
    .filter(([path]) => path.split('/').at(-2) === slug)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Separa o corpo do index.md nas seções "## en" e "## pt", em parágrafos. */
function parsePost(body = ''): Record<Lang, string[]> {
  const sections: Partial<Record<Lang, string[]>> = {};
  const parts = body.split(/^##\s+(en|pt)\s*$/im);
  for (let i = 1; i < parts.length; i += 2) {
    const lang = parts[i].toLowerCase() as Lang;
    sections[lang] = parts[i + 1]
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
      .filter(Boolean);
  }
  return { en: sections.en ?? sections.pt ?? [], pt: sections.pt ?? sections.en ?? [] };
}

export async function getCities(): Promise<Map<string, City>> {
  const entries = await getCollection('cities');
  return new Map(entries.map((c) => [c.id, { id: c.id, ...c.data }]));
}

/** Eventos do mais recente para o mais antigo. */
export async function getEvents(): Promise<EventItem[]> {
  const [entries, cities] = await Promise.all([getCollection('events'), getCities()]);
  return entries
    .map((entry) => {
      const city = cities.get(entry.data.city);
      if (!city) {
        throw new Error(
          `Evento "${entry.id}": a cidade "${entry.data.city}" não existe em src/content/cities.yaml (cidades: ${[...cities.keys()].join(', ')}).`,
        );
      }
      return {
        slug: entry.id,
        name: entry.data.name,
        title: entry.data.title,
        start: isoDate(entry.data.start),
        end: entry.data.end && isoDate(entry.data.end),
        city,
        venue: entry.data.venue,
        roles: entry.data.roles,
        with: entry.data.with,
        post: parsePost(entry.body),
        links: entry.data.links,
        photos: photosOf(entry.id),
      };
    })
    .sort((a, b) => b.start.localeCompare(a.start));
}

const months: Record<Lang, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  pt: ['jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'],
};

const parts = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m, d };
};

/** Data curta para a barra: 05.06.2025 ou 29.06—02.07.2026 */
export function dateStamp(e: EventItem) {
  const pad = (n: number) => String(n).padStart(2, '0');
  const s = parts(e.start);
  if (!e.end) return `${pad(s.d)}.${pad(s.m)}.${s.y}`;
  const f = parts(e.end);
  if (s.m === f.m) return `${pad(s.d)}—${pad(f.d)}.${pad(s.m)}.${s.y}`;
  return `${pad(s.d)}.${pad(s.m)}—${pad(f.d)}.${pad(f.m)}.${f.y}`;
}

/** Data por extenso para o rabisco: "10–12 Sep 2026" / "10–12 set. 2026" */
export function dateLong(e: EventItem, lang: Lang) {
  const s = parts(e.start);
  const mo = months[lang];
  if (!e.end) return `${s.d} ${mo[s.m - 1]} ${s.y}`;
  const f = parts(e.end);
  if (s.m === f.m) return `${s.d}–${f.d} ${mo[s.m - 1]} ${s.y}`;
  return `${s.d} ${mo[s.m - 1]} – ${f.d} ${mo[f.m - 1]} ${f.y}`;
}

/** Coordenadas no estilo de mapa antigo: 19°55′S 43°56′W */
export function coords({ lat, lon }: City) {
  const fmt = (v: number, pos: string, neg: string) => {
    const a = Math.abs(v);
    return `${Math.floor(a)}°${String(Math.round((a % 1) * 60)).padStart(2, '0')}′${v >= 0 ? pos : neg}`;
  };
  return `${fmt(lat, 'N', 'S')} ${fmt(lon, 'E', 'W')}`;
}
