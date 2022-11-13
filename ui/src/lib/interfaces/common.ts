export type HttpMethod = 'GET' | 'POST' | 'HEAD' | 'PATCH' | 'PUT';

export type JobStatus = 'active' | 'disabled';

export interface Job {
  id: number;
  name: string;
  cron: string;
  url: string;
  humanCron?: string;
  method: HttpMethod;
  status: JobStatus;
}

export interface DropdownOptions {
  value: string;
  label: string;
  selected?: boolean;
}

export interface StoreHomepage {
  currentFrequency: string;
}

export interface InputEventTarget {
  value: string;
}

export interface InputEvent {
  target: InputEventTarget;
}