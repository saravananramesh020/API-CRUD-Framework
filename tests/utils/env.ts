import dotenv from 'dotenv';

dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL || 'https://www.sreenidhirajakrishnan.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  headless: process.env.HEADLESS !== 'false',
};

export function getBaseUrl() {
  return env.baseUrl;
}

export function getApiBaseUrl() {
  return env.apiBaseUrl;
}

export function resolveUrl(path: string, baseUrl = getBaseUrl()) {
  if (!path) {
    return baseUrl;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(path, baseUrl).toString();
}

export function resolveApiUrl(path: string) {
  return resolveUrl(path, getApiBaseUrl());
}
