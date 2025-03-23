import { attachEvidence } from "../../src/helpers/report-helper";
import { DataTable } from 'playwright-bdd';
import { Given, Then, When } from "./fixtures";
import { managementTask } from "../../src/tasks/management.task";
import { Customer } from "../../src/dto/customer.dto";

When('add a new customer with:', async ({page, ctx}, customerData: DataTable) => {
    let customerInfo : Record<string, string> = customerData.hashes().shift() || {};
    const customer : Customer = new Customer(customerInfo.first_name, customerInfo.last_name, customerInfo.postal_code);
    
    await managementTask.addCustomerWith(page, customer.firstName, customer.lastName, customer.postalCode);

    ctx.customer = customer;
});

Then('customer is successfully registered', async({page, $testInfo}) => {
    await managementTask.checkCustomerIsRegistered(page);
    await attachEvidence(page, $testInfo);
});

Then('customer is found in module', async({page, $testInfo, ctx}) => {
    const storedCustomer : Customer = ctx.customer;
    await managementTask.searchCustomerInModule(page, storedCustomer.firstName);
    await attachEvidence(page, $testInfo);
});