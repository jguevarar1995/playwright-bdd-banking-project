import { expect, Page, TestInfo } from "@playwright/test";
import { getRandomTransactionAmount } from '../helpers/transaction-amount-helper'
import { CustomerPage } from "../pages";
import { CustomerDepositPage } from "../pages/customer-deposit.page";
import { attachEvidence } from "../helpers/report-helper";
import { Ctx } from "../../features/steps/fixtures";

export const customerTask = {
    makeAccountDeposit: async (page: Page, testInfo: TestInfo, ctx: Ctx) => {
        const customerPage: CustomerPage = new CustomerPage(page);
        const customerDepositPage: CustomerDepositPage = new CustomerDepositPage(page);
        const depositAmount: string = getRandomTransactionAmount().toString();

        ctx.transactionAmount = depositAmount;
        await customerPage.getAccountOperationButton('deposit').click();

        await customerDepositPage.amountInputTextField.waitFor({ state: 'visible' });
        await customerDepositPage.amountInputTextField.fill(depositAmount);

        await attachEvidence(page, testInfo);

        await customerDepositPage.depositButton.last().click();
    }
}