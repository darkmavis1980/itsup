import type { DropdownOptions } from '../lib/interfaces/common';
export const DEV = import.meta.env.DEV || false;
export const API_BASEURL = DEV ? 'http://localhost:7879/' : '/';
export const BASE_URL = '/ui';

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

export const FREQUENCY_OPTIONS: DropdownOptions[] = [
  {
    value: '7d',
    label: '7 Days',
  },
  {
    value: '1d',
    label: '1 Day',
  },
  {
    value: '12h',
    label: '12 hours',
  },
  {
    value: '3h',
    label: '3 hours',
    selected: true,
  },
  {
    value: '1h',
    label: '1 hour',
  },
];