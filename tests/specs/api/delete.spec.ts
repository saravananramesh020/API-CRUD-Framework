import { test, expect } from '@playwright/test';

test.describe('API | Posts', () => {
  test('DELETE /posts/1 returns success', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
  });
});