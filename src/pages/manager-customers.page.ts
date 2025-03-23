import { Locator, Page } from "@playwright/test";

export class ManagerCustomersPage {
    public page: Page;
    public searchCustomerTextBox: Locator;
    public customerTableRowResultSet: Locator;
    public customerAccountValueInRow: Locator;
    public deleteCustomerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchCustomerTextBox = page.locator('xpath=//input[@ng-model="searchCustomer"]');
        this.customerTableRowResultSet = page.locator('xpath=//tr[contains(@ng-repeat, "searchCustomer")]');
        this.customerAccountValueInRow = page.locator('xpath=//span[contains(@ng-repeat, "accountNo")]')
        this.deleteCustomerButton = page.locator('xpath=//button[@ng-click="deleteCust(cust)"]')
    }
}