import { test, expect } from '@playwright/test';

test.describe('API | Posts', () => {
  test('GET /posts/1 returns the expected resource', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.id).toBe(1);
  });
});