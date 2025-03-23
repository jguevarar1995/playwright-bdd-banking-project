import { Dialog, expect, Page } from "@playwright/test";
import { ManagerCustomersPage, ManagerPage } from "../pages";

export const managementTask = {
    addCustomerWith: async (
        page: Page,
        firstName: string,
        lastName: string,
        postalCode: string): Promise<void> => {
        const managerPage: ManagerPage = new ManagerPage(page);

        await managerPage.addCustomerButton.first().click();

        await managerPage.getCustomerFormInputTextField('First Name').fill(firstName);
        await managerPage.getCustomerFormInputTextField('Last Name').fill(lastName);
        await managerPage.getCustomerFormInputTextField('Post Code').fill(postalCode);

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
    searchCustomerInModule: async (page: Page, firstName: string) => {
        const managerPage: ManagerPage = new ManagerPage(page);
        const managerCustomersPage: ManagerCustomersPage = new ManagerCustomersPage(page);

        await managerPage.customersButton.click();
        await managerCustomersPage.searchCustomerTextBox.fill(firstName);
        await managerCustomersPage.customerTableRowResultSet.first().waitFor({state: 'visible'});

        await expect(managerCustomersPage.customerTableRowResultSet.first()).toContainText(firstName);

 
    }
}