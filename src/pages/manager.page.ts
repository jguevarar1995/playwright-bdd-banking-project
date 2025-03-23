import { Locator, Page } from "@playwright/test"

export class ManagerPage {
    public page: Page;
    public addCustomerButton: Locator;
    public openAccountButton: Locator;
    public customersButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
        this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
        this.customersButton = page.getByRole('button', { name: 'Customers' });
    }

    public getCustomerFormInputTextField(inputTextField: string): Locator {
        return this.page.getByPlaceholder(inputTextField);
    }
}