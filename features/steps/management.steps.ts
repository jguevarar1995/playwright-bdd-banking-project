import { attachEvidence } from "../../src/helpers/report-helper";
import { DataTable } from 'playwright-bdd';
import { Then, When } from "./fixtures";
import { managementTask } from "../../src/tasks/management.task";
import { managementAssert } from '../../src/assertions/management.assertions'
import { Customer } from "../../src/dto/customer.dto";

When('add a new customer with:', async ({ page, ctx }, customerData: DataTable) => {
    let customerInfo: Record<string, string> = customerData.hashes().shift() || {};
    const customer: Customer = new Customer(customerInfo.first_name, customerInfo.last_name, customerInfo.postal_code);

    await managementTask.addCustomerWith(page, customer);

    ctx.customer = customer;
});

When('opens an account for customer', async ({ page, ctx, $testInfo }) => {
    const storedCustomer: Customer = ctx.customer;
    const fullName: string = storedCustomer.firstName + " " + storedCustomer.lastName
    await managementTask.openCustomerAccount(page, fullName);
    await attachEvidence(page, $testInfo);
});

When('deletes the customer information', async ({ page, ctx, $testInfo }) => {
    const storedCustomer: Customer = ctx.customer;
    await managementAssert.verifyCustomerRowInModule(page, storedCustomer.firstName || '');
    await attachEvidence(page, $testInfo);
    await managementTask.deleteCustomerInformation(page);
});

When('attempts to register the same customer', async ({ page, ctx }) => {
    const storedCustomer: Customer = ctx.customer;

    await managementTask.addCustomerWith(page, storedCustomer);
});

Then('user should see an alert indicating user already exists', async ({ page, $testInfo }) => {
    await managementAssert.confirmCustomerAlreadyExists(page);
    await attachEvidence(page, $testInfo);
})

Then('customer should not see the customer in table', async ({ page, $testInfo }) => {
    await managementAssert.verifyCustomerHasBeenDeleted(page);
    await attachEvidence(page, $testInfo);
});

Then('customer has been related to an account', async ({ page, ctx, $testInfo }) => {
    const storedCustomer: Customer = ctx.customer;
    await managementAssert.checkAccountOpenedAlert(page, ctx);

    const storedCustomerAccountNumber: string = ctx.customerAccountNumber;
    await managementAssert.verifyCustomerRowInModule(page, storedCustomer.firstName || '');
    await managementAssert.validateAccountNumberInCustomerModule(page, storedCustomerAccountNumber);
    await attachEvidence(page, $testInfo);
})

Then('customer is successfully registered', async ({ page, $testInfo }) => {
    await managementAssert.checkCustomerIsRegistered(page);
    await attachEvidence(page, $testInfo);
});

Then('customer is found in module', async ({ page, $testInfo, ctx }) => {
    const storedCustomer: Customer = ctx.customer;
    await managementAssert.verifyCustomerRowInModule(page, storedCustomer.firstName || '');
    await attachEvidence(page, $testInfo);
});