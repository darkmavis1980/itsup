export const DEV = import.meta.env.DEV || false;

export const API_BASEURL = DEV ? 'http://localhost:7879/' : '/';

console.log(DEV, import.meta.env);

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
