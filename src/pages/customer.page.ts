import { Locator, Page } from "@playwright/test"

export class CustomerPage {
    public page: Page;
    public userNameSelector: Locator;
    public loginAccountButton: Locator;
    public transactionsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameSelector = page.locator('css=#userSelect');
        this.loginAccountButton = page.locator('.btn-default');
        this.transactionsButton = page.locator('xpath=//button[@ng-click="transactions()"]')
    }
}