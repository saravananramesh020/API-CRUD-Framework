import { test, expect } from '@playwright/test';
import { apiData } from '../../../fixtures/apiData';

test('POST', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', { data: apiData });
  expect(response.status()).toBe(201);
});