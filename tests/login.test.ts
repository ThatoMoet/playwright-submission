import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

const valid_username='Admin';
const valid_password = 'admin123';

console.log('LoginPage:', LoginPage); 

test('successful login credentials', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(valid_username, valid_password);
      await expect(page.getByRole('heading',{name: 'Dashboard'})).toBeVisible()
});


test('invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('invalid_username', "invalid_password");
  await expect(page.getByRole('alert').filter({ hasText: 'Invalid credentials' })).toBeVisible();

});