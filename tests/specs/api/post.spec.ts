import { test, expect } from '@playwright/test';
import { apiData } from '../../../fixtures/apiData';
import { resolveApiUrl } from '../../utils/env';

test('POST', async ({ request }) => {
  const response = await request.post(resolveApiUrl('/posts'), { data: apiData });
  expect(response.status()).toBe(201);
});