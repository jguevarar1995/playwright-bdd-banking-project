import {  Dialog, expect, Page } from "@playwright/test";
import { ManagerAccountsPage, ManagerCustomersPage, ManagerPage } from "../pages";
import * as currencyData from '../constants/currency.json'
import { Ctx } from "../../features/steps/fixtures";
import { Customer } from "../dto/customer.dto";

export const managementTask = {
    addCustomerWith: async (
        page: Page,
        customer: Customer): Promise<void> => {
        const managerPage: ManagerPage = new ManagerPage(page);

        await managerPage.addCustomerButton.first().click();

        await managerPage.getCustomerFormInputTextField('First Name').fill(customer.firstName);
        await managerPage.getCustomerFormInputTextField('Last Name').fill(customer.lastName);
        await managerPage.getCustomerFormInputTextField('Post Code').fill(customer.postalCode);

    },
    confirmCustomerAlreadyExists: async(page: Page) => {
        let alertMessage: string = '';
        const managerPage: ManagerPage = new ManagerPage(page);

        page.once('dialog', async (dialog: Dialog) => {
            alertMessage = dialog.message();
            expect(alertMessage).toEqual('Please check the details. Customer may be duplicate.')
            await dialog.dismiss();
        });

        await managerPage.addCustomerButton.last().click();
    },
    checkCustomerIsRegistered: async (page: Page) => {
        let alertMessage: string = '';
        const managerPage: ManagerPage = new ManagerPage(page);

        page.once('dialog', async (dialog: Dialog) => {
            alertMessage = dialog.message();
            expect(alertMessage).toContain('Customer added successfully')
            await dialog.dismiss();
        });

        await managerPage.addCustomerButton.last().click();
    },
    openCustomerAccount: async (page: Page, fullName: string) => {
        const managerPage: ManagerPage = new ManagerPage(page);
        const managerAccountsPage: ManagerAccountsPage = new ManagerAccountsPage(page);

        await managerPage.openAccountButton.click();

        await managerAccountsPage.processButton.waitFor({state: 'visible'});
        
        const currencies = Object.values(currencyData);
        const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)];

        await managerAccountsPage.getOpenAccountSelectorFor('userSelect').selectOption(fullName);
        await managerAccountsPage.getOpenAccountSelectorFor('currency').selectOption(randomCurrency);

    },
    checkAccountOpenedAlert: async (page: Page, ctx: Ctx) => {
        let alertMessage: string = '';
        const managerAccountsPage: ManagerAccountsPage = new ManagerAccountsPage(page);

        page.once('dialog', async (dialog: Dialog) => {
            alertMessage = dialog.message();
            const match = alertMessage.match(/\d+$/);
            const accountNumber = match ? match[0] : null;
            expect(alertMessage).toContain('Account created successfully');
            ctx.customerAccountNumber = accountNumber || '';
            await new Promise(f => setTimeout(f, 1000)); //this timeout avoids flakiness in test
            await dialog.dismiss();
        });

        await managerAccountsPage.processButton.click()
    },
    searchCustomerInModule: async (page: Page, firstName: string) => {
        const managerPage: ManagerPage = new ManagerPage(page);
        const managerCustomersPage: ManagerCustomersPage = new ManagerCustomersPage(page);

        await managerPage.customersButton.click();
        await managerCustomersPage.searchCustomerTextBox.fill(firstName);
        await managerCustomersPage.customerTableRowResultSet.first().waitFor({state: 'visible'});

        await expect(managerCustomersPage.customerTableRowResultSet.first()).toContainText(firstName);

    },
    validateAccountNumberInCustomerModule: async (page: Page, accountNumber: string) => {
        const managerCustomersPage: ManagerCustomersPage = new ManagerCustomersPage(page);
        await expect(managerCustomersPage.customerAccountValueInRow.first()).toHaveText(accountNumber);
    },
    deleteCustomerInformation: async (page: Page) => {
        const managerCustomersPage: ManagerCustomersPage = new ManagerCustomersPage(page);
        await managerCustomersPage.deleteCustomerButton.click();
    },
    verifyCustomerHasBeenDeleted: async (page: Page) => {
        const managerCustomersPage: ManagerCustomersPage = new ManagerCustomersPage(page);
        await managerCustomersPage.customerTableRowResultSet.first().waitFor({state: 'hidden'});
        await expect(managerCustomersPage.customerTableRowResultSet).not.toBeVisible();
    }
}