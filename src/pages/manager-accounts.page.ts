import { Locator, Page } from "@playwright/test";

export class ManagerAccountsPage {
    public page: Page;
    public processButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.processButton = page.getByRole('button', { name: 'Process' });
    }

    public getOpenAccountSelectorFor(selectorType: string) {
        return this.page.locator(`css=#${selectorType}`);
    }
}