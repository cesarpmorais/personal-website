// Ícones em pixel art de cada cidade (aparecem no globo ao passar o mouse no pino), mais o escudo do Cruzeiro.
// Cada linha é uma fileira de pixels; cada letra é uma cor da paleta, "." é transparente.

export interface PixelIconData {
  label: string;
  rows: string[];
  palette: Record<string, string>;
}

export const pixelIcons: Record<string, PixelIconData | undefined> = {
  // Igreja da Pampulha, do Niemeyer, com os azulejos azuis do Portinari e a torre que afina para baixo
  bh: {
    label: 'Igreja da Pampulha',
    rows: [
      '.TT........................',
      '.TT......WWW...............',
      '.TT.....WWWWW..............',
      '.T.....WWWWWWW.............',
      '.T....WWWWWWWWW............',
      '.T....WaAaAaAaW............',
      '.T...WWAaAaAaAWW..W..WW..W.',
      '.T...WWaAaAaAaWW..WW.WW.WW.',
      '.T..WWWAaAaAaAWWWWWW.WW.WWW',
      '.T..WWWaAaAaAaWWWWWWWWWWWWW',
      '.T..WWWAaAaAaAWWWWWWWWWWWWW',
      'GGGGGGGGGGGGGGGGGGGGGGGGGGG',
    ],
    palette: { W: '#f1ead8', A: '#2f529e', a: '#90a9df', T: '#c9ccd4', G: '#5d6578' },
  },
  // Easter egg de BH: o escudo do Cruzeiro de 1956–1959, com as estrelas do Cruzeiro do Sul
  'cruzeiro-1956': {
    label: 'Escudo do Cruzeiro (1956–1959)',
    rows: [
      '.......BBBBB.......',
      '.....BBWWWWWBB.....',
      '...BBWWBBBBBWWBB...',
      '..BBWBBBBBBBBBWBB..',
      '..BWBBBBBBWBBBBWB..',
      '.BWBBBBBBWWWBBBBWB.',
      '.BWBBBBBBBWBBBBBWB.',
      'BWBBBWBBBBBBBBBBBWB',
      'BWBBWWWBBBBBBWBBBWB',
      'BWBBBWBBBBBBWWWBBWB',
      'BWBBBBBBBWBBBWBBBWB',
      'BWBBBBBBBBBBBBBBBWB',
      '.BWBBBBBWBBBBBBBWB.',
      '.BWBBBBWWWBBBBBBWB.',
      '..BWBBBBWBBBBBBWB..',
      '..BBWBBBBBBBBBWBB..',
      '...BBWWBBBBBWWBB...',
      '.....BBWWWWWBB.....',
      '.......BBBBB.......',
    ],
    palette: { B: '#2f529e', W: '#f1ead8' },
  },
  // Bandeira do Brasil no mastro e a skyline do centro de São Paulo
  sp: {
    label: 'Skyline de São Paulo com a bandeira do Brasil',
    rows: [
      'PVVVVVVV.......S.............',
      'PVVYYYVV.......S.............',
      'PVYYAYYV......SSS......S.....',
      'PVVYYYVV......SwS.....SSS....',
      'PVVVVVVV...SS.SSS.....SwS.SS.',
      'P..........Sw.SwS..SS.SSS.Sw.',
      'P........SSSS.SSS..Sw.SwS.SS.',
      'P........SwSS.SwSSSSS.SSSSSwS',
      'P........SSSSSSSSSwSSSSwSSSSS',
      'P........SSSSSSSSSSSSSSSSSSSS',
    ],
    palette: { P: '#8a8f9c', V: '#3f8a52', Y: '#e0c046', A: '#2f529e', S: '#5d6578', w: '#90a9df' },
  },
  // Golden Gate
  sf: {
    label: 'Golden Gate',
    rows: [
      '.....X.........X.......',
      '....XXX.......XXX......',
      '...X.X.X.....X.X.X.....',
      '..X..X..X...X..X..X....',
      '.X...X...XXX...X...X...',
      'XXXXXXXXXXXXXXXXXXXXXXX',
      '.....X.........X.......',
      '.....X.........X.......',
    ],
    palette: { X: '#c9553a' },
  },
};
