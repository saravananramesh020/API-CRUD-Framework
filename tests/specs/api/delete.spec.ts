import { test, expect } from '@playwright/test';
import { resolveApiUrl } from '../../utils/env';

test.describe('API | Posts', () => {
  test('DELETE /posts/1 returns success', async ({ request }) => {
    const response = await request.delete(resolveApiUrl('/posts/1'));
    expect(response.ok()).toBeTruthy();
  });
});