import type { PageLoad } from './$types';
import { httpRequest } from '$lib/http';

export const load: PageLoad = async ({ params }) => {
  const { data } = await httpRequest.get(`jobs/${params.id}`);
  return data;
}