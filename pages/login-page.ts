import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

   constructor(page: Page) {
    this.page = page;
    this.userName = page.getByRole('textbox', { name: 'Username' })
    this.password =  this.page.getByRole('textbox', { name: 'Password' });
    this.loginButton = this.page.getByRole('button', { name: 'Login' });


    
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com');
  }

  

  async login(username: string, password: string) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();

  }

  
}