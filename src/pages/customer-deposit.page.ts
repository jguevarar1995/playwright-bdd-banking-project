import { Locator, Page } from "@playwright/test"

export class CustomerDepositPage {
    public page: Page;
    public amountInputTextField: Locator;
    public depositButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.amountInputTextField = page.getByPlaceholder('amount');
        this.depositButton = page.getByRole('button', { name: 'Deposit' });
    }
}