// Gera public/favicon.svg: "CPM" em pixel art azul, fundo transparente.
// Rodar com: node scripts/make-favicon.mjs
import { writeFileSync } from 'node:fs';

const SIZE = 21;
const COLOR = '#2f529e'; // azul Cruzeiro

// Letras em grade (X = pixel aceso), traço de 2px.
const C = [
  '.XXXX',
  'XXXXX',
  'XX...',
  'XX...',
  'XX...',
  'XX...',
  'XX...',
  'XX...',
  'XX...',
  'XXXXX',
  '.XXXX',
];
const P = [
  'XXXX.',
  'XXXXX',
  'XX.XX',
  'XX.XX',
  'XX.XX',
  'XXXXX',
  'XXXX.',
  'XX...',
  'XX...',
  'XX...',
  'XX...',
];
const M = [
  'XX...XX',
  'XXX.XXX',
  'XXXXXXX',
  'XX.X.XX',
  'XX...XX',
  'XX...XX',
  'XX...XX',
  'XX...XX',
  'XX...XX',
  'XX...XX',
  'XX...XX',
];

// Linhas 5–15: as letras ficam centralizadas na vertical.
const letters = [
  { glyph: C, x: 1 },
  { glyph: P, x: 7 },
  { glyph: M, x: 13 },
];
const TOP = 5;

const rects = [];
for (const { glyph, x } of letters) {
  glyph.forEach((row, dy) =>
    [...row].forEach((ch, dx) => {
      if (ch === 'X') rects.push(`<rect x="${x + dx}" y="${TOP + dy}" width="1" height="1"/>`);
    }),
  );
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" shape-rendering="crispEdges" fill="${COLOR}">
${rects.join('\n')}
</svg>
`;

writeFileSync(new URL('../public/favicon.svg', import.meta.url), svg);
console.log(`favicon.svg gerado (${rects.length} pixels)`);
