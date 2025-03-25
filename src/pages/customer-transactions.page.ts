
import { Locator, Page } from "@playwright/test"

export class CustomerTransactionsPage {
    public page: Page;
    public customerTransactionsRows: Locator;
    public startDatePicker: Locator;

    constructor(page: Page) {
        this.page = page;
        this.customerTransactionsRows = page.locator('xpath=//tr[contains(@ng-repeat,"transactions")]');
        this.startDatePicker = page.locator("css=#start")
    }

    public getValueInLastTransactionRow(value: string) {
        return this.customerTransactionsRows
            .last()
            .filter({ hasText: value });
    }
}