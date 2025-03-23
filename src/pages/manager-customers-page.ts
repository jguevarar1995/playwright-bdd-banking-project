import { Locator, Page } from "@playwright/test";

export class ManagerCustomersPage {
    public page: Page;
    public searchCustomerTextBox: Locator;
    public customerTableRowResultSet: Locator

    constructor(page: Page) {
        this.page = page;
        this.searchCustomerTextBox = page.locator('xpath=//input[@ng-model="searchCustomer"]');
        this.customerTableRowResultSet = page.locator('xpath=//tr[contains(@ng-repeat, "searchCustomer")]');
    }
}