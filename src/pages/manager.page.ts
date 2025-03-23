import { Locator, Page } from "@playwright/test"

export class ManagerPage {
    public page: Page;
    public addCustomerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    }

    public getCustomerFormInputTextField(inputTextField: string): Locator {
        return this.page.getByPlaceholder(inputTextField);
    }
}