import { attachEvidence } from "../../src/helpers/report-helper";
import { DataTable } from 'playwright-bdd';
import { Given, Then, When } from "./fixtures";
import { managementTask } from "../../src/tasks/management.task";

When('add a new customer with:', async ({page, $testInfo}, customerData: DataTable) => {
    let customer : Record<string, string> = customerData.hashes().shift() || {};

    await managementTask.addCustomerWith(page, customer.first_name, customer.last_name, customer.postal_code);
});

Then('user is successfully registered', async({page, $testInfo}) => {
    await managementTask.checkCustomerIsRegistered(page);
    await attachEvidence(page, $testInfo);
});