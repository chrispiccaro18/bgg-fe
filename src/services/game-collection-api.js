import { get } from './request';

export const getCollection = username => get(`/collection/${username}`);
