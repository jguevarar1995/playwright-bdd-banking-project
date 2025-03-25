import { expect, Page } from "@playwright/test";
import { LoginPage, CustomerPage, ManagerPage } from "../pages";

export const loginTask = {
    navigateTo: async (page: Page): Promise<void> => {
        await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject');
    },
    loginAs: async (page: Page, userType: string): Promise<void> => {
        const loginPage: LoginPage = new LoginPage(page);

        await loginPage.getUserTypeLoginButton(userType).click();
    },
    withName: async (page: Page, userName: string): Promise<void> => {
        const customerPage: CustomerPage = new CustomerPage(page);
        await customerPage.userNameSelector.click();
        await customerPage.userNameSelector.selectOption({ label: userName });

        await customerPage.loginAccountButton.click();
    }
}