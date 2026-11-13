// Conteúdo do site que não é código: eventos (uma pasta por evento) e cidades.
// O formato de cada evento está explicado em src/content/events/README.md.
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Texto em um idioma só ("Hotmart FIRE") ou nos dois ({ en: ..., pt: ... }).
// Se faltar o português, usa o inglês (e vice-versa).
const text = z
  .union([z.string(), z.object({ en: z.string().optional(), pt: z.string().optional() })])
  .transform((v) => (typeof v === 'string' ? { en: v, pt: v } : { en: v.en ?? v.pt ?? '', pt: v.pt ?? v.en ?? '' }));

const events = defineCollection({
  // Cada pasta em src/content/events com um index.md é um evento; o nome da pasta é o endereço (#slug)
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/events',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    name: text,
    title: text,
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    city: z.string(),
    venue: text.optional(),
    roles: z.array(z.enum(['speaker', 'participant', 'organizer', 'winner'])).min(1),
    with: z.array(z.string()).optional(),
    links: z.array(z.object({ label: text, url: z.string().url() })).default([]),
  }),
});

const cities = defineCollection({
  loader: file('src/content/cities.yaml'),
  schema: z.object({
    name: text,
    short: z.string(),
    lat: z.number(),
    lon: z.number(),
    /** Onde desenhar o pino no globo, quando a posição real fica apertada (opcional). */
    pin: z.object({ lat: z.number(), lon: z.number() }).optional(),
  }),
});

export const collections = { events, cities };
