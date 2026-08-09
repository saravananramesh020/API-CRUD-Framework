import { test, expect } from '@playwright/test';
import { PracticePage } from '../pages/practice.page';

test.describe('Practice page - Basic Form', () => {
  test('basic form submit and reset', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.goto();

    // initial state
    expect(await practice.getFormResultText()).toContain('Not submitted');

    // fill and submit
    await practice.fillBasicForm({
      username: 'Alice Tester',
      password: 'P@ssw0rd',
      email: 'alice@example.com',
      phone: '1234567890',
      bio: 'Automation enthusiast',
    });
    await practice.submitForm();

    const resultAfter = await practice.getFormResultText();
    expect(resultAfter.toLowerCase()).not.toContain('not submitted');

    // reset and verify back to initial
    await practice.resetForm();
    // small wait for reset to take effect
    await page.waitForTimeout(200);
    const afterReset = await practice.getFormResultText();
    // The page displays "Form was reset" after a reset — accept that as the correct post-reset state
    expect(afterReset).toMatch(/(Not submitted|Form was reset)/);
  });
});
