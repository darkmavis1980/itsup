import axios from 'axios';
import { API_BASEURL } from '../config';

export const httpRequest = axios.create({
  baseURL: API_BASEURL,
});