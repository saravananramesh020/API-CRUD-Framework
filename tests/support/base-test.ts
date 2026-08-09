import { test as baseTest, expect as baseExpect } from '@playwright/test';
import { SliderPage } from '../pages';

export type AppFixtures = {
  sliderPage: SliderPage;
};

export const test = baseTest.extend<AppFixtures>({
  sliderPage: async ({ page }, use) => {
    await use(new SliderPage(page));
  },
});

export const expect = baseExpect;
