import { Locator, Page } from "@playwright/test";

export class LoginPage {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public getUserTypeLoginButton(userType: string): Locator {
        return this.page.locator(`xpath=//button[@ng-click="${userType}()"]`)
    }

}