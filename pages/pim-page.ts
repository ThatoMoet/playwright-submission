import { type Page, type Locator,expect } from '@playwright/test';

export class PimPage {
  readonly page: Page;
  readonly addEmployeeBtn: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveBtn: Locator;
  readonly successBanner: Locator;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly deleteBtn: Locator;
  readonly confirmDeleteBtn: Locator;
  readonly personalDetailsHeader: Locator;
  readonly pimMenu: Locator;
  readonly employeeNameSearch: Locator;



  constructor(page: Page) {
    this.page = page;
    this.addEmployeeBtn = page.getByRole('button', { name: ' Add' })
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.employeeIdInput = page.locator('form').locator('input').nth(2);
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.successBanner = page.locator('.oxd-toast--success');
    this.searchInput = page.getByRole('textbox', { name: 'Type for hints...' }).first();
    this.searchBtn = page.getByRole('button', { name: 'Search' });
    this.deleteBtn = page.getByRole('button', { name: 'Delete Selected' });
    this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes, Delete' });
    this.personalDetailsHeader = page.getByRole('heading', { name: 'Personal Details' })
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.employeeNameSearch =  page.getByRole('textbox', { name: 'Type for hints...' }).first();
  }

 async goToPim() {
    await expect(this.pimMenu).toBeVisible();   
    await this.pimMenu.click();
  }

 async goToEmployeeList() {
        this.page.getByRole('listitem').filter({ hasText: 'Employee List' }).click();
        await this.page
        .getByRole('heading', { name: 'Employee Information' })
        .waitFor({ state: 'visible' });
}

  async addEmployee(firstName: string, lastName: string) {
    console.log("What is happening");
    await expect(this.addEmployeeBtn).toBeVisible();
    await this.addEmployeeBtn.click();

    await this.firstNameInput.waitFor({ state: 'visible', timeout: 90000 });
    await this.lastNameInput.waitFor({ state: 'visible', timeout: 90000 });

    const loader = this.page.locator('.oxd-form-loader');
    await loader.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});

    console.log("Filling form...");
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    await this.saveBtn.click();
    console.log("Clicking Save...");
    

    // await this.personalDetailsHeader.waitFor({ state: 'visible', timeout: 60000 });
  }


  async submitForm() {
    try {
    await this.successBanner.waitFor({ state: 'visible', timeout: 5000 });
    await this.successBanner.waitFor({ state: 'hidden', timeout: 5000 });
  } catch (error) {
    // Success banner might not appear, that's okay
    console.log('Success banner not found, continuing...');
  }
  
  // Wait for navigation or page to stabilize instead
  await this.page.waitForLoadState('domcontentloaded');
}

  async searchEmployee(fullName: string ): Promise<number>  {
    await this.goToPim();
    await this.employeeNameSearch.click();
    await this.employeeNameSearch.fill(fullName);
    await this.searchBtn.click();

    await this.page.waitForSelector('div[class*="orangehrm-container"]', { timeout: 10000 });

    const noRecordsVisible = await this.page
    .getByText('No Records')
    .isVisible({ timeout: 5000 })
    .catch(() => false); 
    if (noRecordsVisible) {
    return 0;}

    const rows = await this.page.locator('div.oxd-table-card').all();
    let count = 0;
    for (const row of rows) {
      const text = await row.textContent();
      if (text && text.includes(fullName)) {
        count++;
      }
    }
    return count;
  
  }

  async isEmployeeInList(name: string) {
    const allRows = this.page.locator('.oxd-table-card, .oxd-table-row, .oxd-table-body .oxd-table-row');
    const rowCount = await allRows.count();
    
    console.log(`Total rows in table: ${rowCount}`);
  
  // Look through each row for the name
    for (let i = 0; i < rowCount; i++) {
        const rowText = await allRows.nth(i).innerText();
        console.log(`Row ${i} text:`, rowText);
        
        if (rowText.includes(name)) {
            console.log(`✓ Found ${name} in row ${i}`);
            return true;
        }
    }
    console.log(`✗ ${name} not found in any row`);
    return false;


    
    // return await this.page.getByText(name, { exact: true }).isVisible({ timeout: 5000 });
  }

  async deleteEmployee() {
    await this.page.getByRole('checkbox').first().check();
    await this.deleteBtn.click();
    await this.confirmDeleteBtn.click();
    await this.page.waitForSelector('.oxd-toast--success', { state: 'visible' });
  }
}