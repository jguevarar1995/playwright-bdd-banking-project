import { attachEvidence } from "../../src/helpers/report-helper";
import { loginTask } from "../../src/tasks/login.task";
import { Given, Then, When } from "./fixtures";

Given('user navigates into the banking site', async ({page}) => {
    await loginTask.navigateTo(page);
});

When('login as {string}', async ({page, $testInfo}, userType: string) => {
    await loginTask.loginAs(page, userType);
    await attachEvidence(page, $testInfo);
});

Then('user should see the customer home page', async({page, $testInfo}) => {
    await loginTask.verifyCustomerIsLoggedIn(page);
    await attachEvidence(page, $testInfo);
});

When('selects {string}', async ({page, $testInfo}, userName: string) => {
    await loginTask.withName(page, userName);
    await attachEvidence(page, $testInfo);
});

Then('user should see his account details', async ({page, $testInfo}) => {
    await loginTask.checkAccountDetails(page);
    await attachEvidence(page, $testInfo);
})