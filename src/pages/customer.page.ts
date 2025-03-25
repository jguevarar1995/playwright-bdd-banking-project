import { Locator, Page } from "@playwright/test"

export class CustomerPage {
    public page: Page;
    public userNameSelector: Locator;
    public userNameSpan: Locator;
    public loginAccountButton: Locator;
    public currentBalanceText: Locator;
    public transactionMessageSpan: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameSelector = page.locator('css=#userSelect');
        this.userNameSpan = page.locator('//span[contains(@class, "fontBig")]');
        this.loginAccountButton = page.locator('.btn-default');
        this.currentBalanceText = page.locator('div:has-text("Balance :")').locator('xpath=./strong[2]');
        this.transactionMessageSpan = page.locator('xpath=//span[@ng-show="message"]');
    }

    public getAccountOperationButton(operationType: string){
        return this.page.locator(`xpath=//button[@ng-click="${operationType}()"]`);
    }
}