import { test, expect } from '@playwright/test';

test.describe('API | Posts', () => {
  test('PUT /posts/1 updates the resource', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: { id: 1, title: 'Updated', body: 'Updated', userId: 1 },
    });

    expect(response.ok()).toBeTruthy();
  });
});