export type HttpMethod = 'GET' | 'POST' | 'HEAD' | 'PATCH' | 'PUT';

export interface Job {
  name: string;
  cron: string;
  url: string;
  humanCron?: string;
  method: HttpMethod;
};
