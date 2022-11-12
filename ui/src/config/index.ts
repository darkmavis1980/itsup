export const DEV = import.meta.env.DEV || true;

export const API_BASEURL = DEV ? 'http://localhost:7879/' : '/';

console.log(DEV);

export const chartColors: string[] = [
  // '#cdb4db',
  // '#ffc8dd',
  // '#ffafcc',
  // '#bde0fe',
  // '#a2d2ff',
  '#05445E',
  '#189AB4',
  '#75E6DA',
  '#D4F1F4',
];
