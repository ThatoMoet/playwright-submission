import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly dashboardHeader: Locator;
  readonly userDropdown: Locator;
  readonly logoutLink: Locator;



   constructor(page: Page) {
    this.page = page;
    this.userName = page.getByRole('textbox', { name: 'Username' })
    this.password =  this.page.getByRole('textbox', { name: 'Password' });
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
    this.userDropdown = page.locator('.oxd-userdropdown-name');
    this.logoutLink = page.locator('a[href*="/auth/logout"]');


    
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com');
  }


  async login(username: string, password: string) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();

  }

  

  async logout() {
    await this.userDropdown.click();
    await this.logoutLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}

  
