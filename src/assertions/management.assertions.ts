import { Page, Dialog, expect } from "@playwright/test";
import { ManagerAccountsPage, ManagerCustomersPage, ManagerPage } from "../pages";
import { Ctx } from "../../features/steps/fixtures";

export const managementAssert = {
    confirmCustomerAlreadyExists: async (page: Page) => {
        let alertMessage: string = '';
        const managerPage: ManagerPage = new ManagerPage(page);

        page.once('dialog', async (dialog: Dialog) => {
            alertMessage = dialog.message();
            console.log(alertMessage);
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
            console.log(alertMessage);
            expect(alertMessage).toContain('Customer added successfully')
            await dialog.dismiss();
        });

        await managerPage.addCustomerButton.last().click();
    },
    checkAccountOpenedAlert: async (page: Page, ctx: Ctx) => {
        let alertMessage: string = '';
        const managerAccountsPage: ManagerAccountsPage = new ManagerAccountsPage(page);

        page.once('dialog', async (dialog: Dialog) => {
            alertMessage = dialog.message();
            console.log(alertMessage);
            const match = alertMessage.match(/\d+$/);
            const accountNumber = match ? match[0] : null;
            expect(alertMessage).toContain('Account created successfully');
            ctx.customerAccountNumber = accountNumber || '';
            await new Promise(f => setTimeout(f, 1000)); //this timeout avoids flakiness in test
            await dialog.dismiss();
        });

        await managerAccountsPage.processButton.click()
    },
    verifyCustomerRowInModule: async (page: Page, firstName: string) => {
        const managerPage: ManagerPage = new ManagerPage(page);
        const managerCustomersPage: ManagerCustomersPage = new ManagerCustomersPage(page);

        await managerPage.customersButton.click();
        await managerCustomersPage.searchCustomerTextBox.fill(firstName);
        await managerCustomersPage.customerTableRowResultSet.first().waitFor({ state: 'visible' });

        await expect(managerCustomersPage.customerTableRowResultSet.first()).toContainText(firstName);

    },
    validateAccountNumberInCustomerModule: async (page: Page, accountNumber: string) => {
        const managerCustomersPage: ManagerCustomersPage = new ManagerCustomersPage(page);
        await expect(managerCustomersPage.customerAccountValueInRow.first()).toHaveText(accountNumber);
    },

    verifyCustomerHasBeenDeleted: async (page: Page) => {
        const managerCustomersPage: ManagerCustomersPage = new ManagerCustomersPage(page);
        await managerCustomersPage.customerTableRowResultSet.first().waitFor({ state: 'hidden' });
        await expect(managerCustomersPage.customerTableRowResultSet).not.toBeVisible();
    }
}