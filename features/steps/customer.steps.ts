import { attachEvidence } from "../../src/helpers/report-helper";
import { CustomerPage } from "../../src/pages";
import { customerTask } from "../../src/tasks/customer.task";
import { Then, When } from "./fixtures";

When('makes a deposit transaction', async ({ page, ctx, $testInfo }) => {
    const customerPage: CustomerPage = new CustomerPage(page);

    const currentBalance = await customerPage.currentBalanceText.textContent();
    ctx.customerCurrentBalanceAcount = currentBalance?.trim() || '';
    await customerTask.makeAccountDeposit(page, $testInfo, ctx);
    await attachEvidence(page, $testInfo);
});

Then('user balance account has been topped up', async ({ page, ctx }) => {
    const previousBalanceAmount = ctx.customerCurrentBalanceAcount;
    const depositAmount = ctx.transactionAmount;

    const newBalanceAmount = parseInt(previousBalanceAmount) + parseInt(depositAmount);
    await customerTask.verifyNewAccountBalance(page, newBalanceAmount);
});