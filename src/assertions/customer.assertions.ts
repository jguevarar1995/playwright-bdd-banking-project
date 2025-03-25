import { Page, expect } from "@playwright/test";
import { CustomerPage } from "../pages";

export const customerAssert = {
    verifyNewAccountBalance: async (page: Page, newBalanceAmount: number) => {
        const customerPage: CustomerPage = new CustomerPage(page);
        const currentBalanceText: string = await customerPage.currentBalanceText.textContent() || '';

        expect(Number.parseInt(currentBalanceText)).toBe(newBalanceAmount)
    }
}