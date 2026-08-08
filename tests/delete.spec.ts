import {test,expect} from '@playwright/test';test('DELETE',async({request})=>{
    const r=await request.delete('/posts/1');expect(r.ok()).toBeTruthy();});