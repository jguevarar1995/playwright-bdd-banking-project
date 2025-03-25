import { Page, expect } from "@playwright/test";
import { CustomerPage, ManagerPage } from "../pages";

export const loginAssert = {
    verifyCustomerIsLoggedIn: async (page: Page): Promise<void> => {
        const customerPage: CustomerPage = new CustomerPage(page);
        await expect(customerPage.userNameSelector).toBeVisible({ timeout: 1000 });

    },
    verifyManagerIsLoggedIn: async (page: Page): Promise<void> => {
        const managerPage: ManagerPage = new ManagerPage(page);
        await expect(managerPage.addCustomerButton).toBeVisible({ timeout: 1000 });

    },
    checkAccountDetails: async (page: Page, userName: string): Promise<void> => {
        const customerPage: CustomerPage = new CustomerPage(page);

        await expect(customerPage.getAccountOperationButton('transactions')).toBeVisible({ timeout: 1000 });
        await expect(customerPage.userNameSpan).toHaveText(userName)
    }
}