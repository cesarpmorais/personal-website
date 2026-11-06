// Fundos disponíveis para o site. Em dev, dá pra alternar entre eles com a barra escondida (Alt+B).
// Em produção vale só o DEFAULT_BACKGROUND.

export type BackgroundAnimation =
  | { kind: 'drift'; dx: number; dy: number; duration: number } // o padrão desliza um tile por ciclo
  | { kind: 'travel'; dx: number; duration: number } // camada girada desliza ao longo das linhas
  | { kind: 'wave-pass'; period: number; duration: number } // faixa de luz passa por baixo, linhas paradas
  | { kind: 'spotlight'; radius: number }; // linhas acendem perto do mouse

export interface Background {
  id: string;
  label: string;
  image: string; // valor CSS de background-image
  tile: [number, number];
  /** Camada girada -45° (para o padrão de linhas onduladas). */
  rotated?: boolean;
  animation: BackgroundAnimation;
}

const BLUE = '%232f529e'; // azul Cruzeiro (o mesmo --color-accent do global.css)
const svg = (markup: string) => `url("data:image/svg+xml,${markup}")`;

// Linhas horizontais em forma de senoide, todas em fase; giradas viram diagonais onduladas.
function wavyLinesTile(wavelength: number, spacing: number, amplitude: number) {
  const copies = Math.ceil(amplitude / spacing) + 1;
  const paths: string[] = [];
  for (let k = -copies; k <= copies; k++) {
    const points: string[] = [];
    for (let x = 0; x <= wavelength; x += 2) {
      const y = spacing / 2 + k * spacing + amplitude * Math.sin((2 * Math.PI * x) / wavelength);
      points.push(`${x},${y.toFixed(2)}`);
    }
    paths.push(`M${points.join('L')}`);
  }
  return svg(
    `%3Csvg xmlns='http://www.w3.org/2000/svg' width='${wavelength}' height='${spacing}'%3E%3Cpath d='${paths.join('')}' fill='none' stroke='${BLUE}' stroke-opacity='0.4' stroke-width='1'/%3E%3C/svg%3E`,
  );
}

export const backgrounds: Background[] = [
  {
    id: 'diagonal',
    label: 'Diagonal',
    image: svg(
      `%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${BLUE}' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E`,
    ),
    tile: [6, 6],
    animation: { kind: 'wave-pass', period: 360, duration: 12 },
  },
  {
    id: 'wavy',
    label: 'Ondulada',
    image: wavyLinesTile(120, 5, 6),
    tile: [120, 5],
    rotated: true,
    animation: { kind: 'travel', dx: 120, duration: 8 },
  },
  {
    id: 'triangles',
    label: 'Triângulos',
    image: svg(
      `%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='${BLUE}' fill-opacity='0.36' fill-rule='evenodd'/%3E%3C/svg%3E`,
    ),
    tile: [20, 20],
    animation: { kind: 'drift', dx: 20, dy: 20, duration: 12 },
  },
  {
    id: 'dashes',
    label: 'Traços',
    image: svg(
      `%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='${BLUE}' fill-opacity='0.36' fill-rule='evenodd'/%3E%3C/svg%3E`,
    ),
    tile: [12, 16],
    animation: { kind: 'drift', dx: 0, dy: 16, duration: 6 },
  },
  {
    id: 'zigzag',
    label: 'Zigue-zague',
    image: svg(
      `%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='${BLUE}' fill-opacity='0.4'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`,
    ),
    tile: [20, 12],
    animation: { kind: 'drift', dx: 20, dy: 0, duration: 7 },
  },
  {
    id: 'grid',
    label: 'Milimetrado',
    image: svg(
      `%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='${BLUE}' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`,
    ),
    tile: [100, 100],
    animation: { kind: 'spotlight', radius: 220 },
  },
];

/** Fundo usado em produção (e o inicial em dev). */
export const DEFAULT_BACKGROUND = { id: 'grid', animated: true };
