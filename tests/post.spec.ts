import {test,expect} from '@playwright/test';import {apiData} from '../fixtures/apiData';
test('POST',async({request})=>{
    const r=await request.post('/posts',{data:apiData});
    expect(r.status()).toBe(201);});