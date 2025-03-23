import { Dialog, expect, Page } from "@playwright/test";
import { ManagerPage } from "../pages";

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
    }
}