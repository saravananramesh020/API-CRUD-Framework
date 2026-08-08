import { test, expect } from '@playwright/test';
test('PUT', async ({ request }) => { const r = await request.put('/posts/1', 
    { data: { id: 1, title: 'Updated', body: 'Updated', userId: 1 } }); 
expect(r.ok()).toBeTruthy(); });