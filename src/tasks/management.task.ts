import { Dialog, expect, Page } from "@playwright/test";
import { ManagerAccountsPage, ManagerCustomersPage, ManagerPage } from "../pages";
import * as currencyData from '../constants/currency.json'
import { Customer } from "../dto/customer.dto";

export const managementTask = {
    addCustomerWith: async (
        page: Page,
        customer: Customer): Promise<void> => {
        const managerPage: ManagerPage = new ManagerPage(page);

        await managerPage.addCustomerButton.first().click();

        await managerPage.getCustomerFormInputTextField('First Name').fill(customer.firstName || '');
        await managerPage.getCustomerFormInputTextField('Last Name').fill(customer.lastName || '');
        await managerPage.getCustomerFormInputTextField('Post Code').fill(customer.postalCode || '');

    },
    openCustomerAccount: async (page: Page, fullName: string) => {
        const managerPage: ManagerPage = new ManagerPage(page);
        const managerAccountsPage: ManagerAccountsPage = new ManagerAccountsPage(page);

        await managerPage.openAccountButton.click();

        await managerAccountsPage.processButton.waitFor({ state: 'visible' });

        const currencies = Object.values(currencyData);
        const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)];

        await managerAccountsPage.getOpenAccountSelectorFor('userSelect').selectOption(fullName);
        await managerAccountsPage.getOpenAccountSelectorFor('currency').selectOption(randomCurrency);

    },
    deleteCustomerInformation: async (page: Page) => {
        const managerCustomersPage: ManagerCustomersPage = new ManagerCustomersPage(page);
        await managerCustomersPage.deleteCustomerButton.click();
    }
}