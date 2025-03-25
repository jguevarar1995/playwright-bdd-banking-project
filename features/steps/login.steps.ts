import { Customer } from "../../src/dto/customer.dto";
import { attachEvidence } from "../../src/helpers/report-helper";
import { loginTask } from "../../src/tasks/login.task";
import { Given, Then, When } from "./fixtures";

Given('user navigates into the banking site', async ({page}) => {
    await loginTask.navigateTo(page);
});

Given('user login as {string}', async ({page}, userType: string) => {
    await loginTask.navigateTo(page);
    await loginTask.loginAs(page, userType);
});

When('login as {string}', async ({page, $testInfo}, userType: string) => {
    await loginTask.loginAs(page, userType);
    await attachEvidence(page, $testInfo);
});

When('login as customer with username {string}', async({page, $testInfo, ctx}, userName: string) => {
    const customer : Customer = new Customer(userName);

    await loginTask.loginAs(page, 'customer');
    await loginTask.withName(page, userName);
    await attachEvidence(page, $testInfo);

    ctx.customer = customer;
})

Then('user should see the customer home page', async({page, $testInfo}) => {
    await loginTask.verifyCustomerIsLoggedIn(page);
    await attachEvidence(page, $testInfo);
});

Then('user should see the management page', async({page, $testInfo}) => {
    await loginTask.verifyManagerIsLoggedIn(page);
    await attachEvidence(page, $testInfo);
});

Then('user should see his account details', async ({page, $testInfo, ctx}) => {
    const storedCustomer : Customer = ctx.customer;

    await loginTask.checkAccountDetails(page, storedCustomer.firstName || '');
    await attachEvidence(page, $testInfo);
})