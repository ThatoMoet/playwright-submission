import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';


// import { DashboardPage } from '../pages/dashboard-page';
// console.log('DashboardPage:', DashboardPage); // Should log [class DashboardPage]
// console.log('Type:', typeof DashboardPage); // Should log 'function'

import { PimPage } from '../pages/pim-page';
import employeesData from '../data/employees.json';

const VALID_EMPLOYEES = employeesData.validEmployees;

// test.describe('Employee CRUD Operations', () => {
//   test.beforeEach(async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login('Admin', 'admin123');

//     const dashboard = new DashboardPage(page);
//     await dashboard.goToPim();
//   });

  test('should create multiple employees', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    // await expect(loginPage.dashboardHeader).toBeVisible();

    const pimPage = new PimPage(page);
    await pimPage.goToPim();

    for (const emp of VALID_EMPLOYEES) {
    const fullName = `${emp.firstName} ${emp.lastName}`;
    await pimPage.addEmployee(emp.firstName, emp.lastName,);

    await pimPage.goToEmployeeList;


    console.log('Current URL:', page.url());
    
    await page.reload();
    

    }
  });

  test('search already created employees', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    const pimPage = new PimPage(page);
    await pimPage.goToPim();

    for (const emp of VALID_EMPLOYEES) {
    const fullName = `${emp.firstName} `;
    const foundCount = await pimPage.searchEmployee(fullName);

    expect(foundCount).toBeGreaterThanOrEqual(1);

  }

//   test('should update and delete employee', async ({ page }) => {
//     const pimPage = new PimPage(page);
//     const emp = VALID_EMPLOYEES[0];

//     // Create
//     await pimPage.goToAddEmployee();
//     await pimPage.fillEmployeeForm(emp.firstName, emp.lastName, emp.employeeId);
//     await pimPage.submitForm();
//     await page.getByRole('link', { name: 'Employee List' }).click();

//     // Update: Edit first name
//     await pimPage.searchEmployee(emp.firstName);
//     await page.getByText(emp.firstName, { exact: true }).click();
//     await page.getByRole('button', { name: 'Edit' }).click();
//     await page.getByLabel('First Name').fill('UpdatedJohn');
//     await page.getByRole('button', { name: 'Save' }).click();
//     await page.getByRole('link', { name: 'Employee List' }).click();

//     // Verify update
//     await pimPage.searchEmployee('UpdatedJohn');
//     await expect(await pimPage.isEmployeeInList('UpdatedJohn')).toBeTruthy();

//     // Delete
//     await pimPage.deleteEmployee();
    
//     // Verify deletion
//     await pimPage.searchEmployee('UpdatedJohn');
//     await expect(await pimPage.isEmployeeInList('UpdatedJohn')).toBeFalsy();
//   });
// });