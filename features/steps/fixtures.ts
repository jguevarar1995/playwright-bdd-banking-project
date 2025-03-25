import { test as base, createBdd } from 'playwright-bdd';
import { Customer } from '../../src/dto/customer.dto';

export type Ctx = {
    customer: Customer,
    customerAccountNumber: string,
    customerCurrentBalanceAcount: string,
    transactionAmount: string
}

export const test = base.extend<{ ctx: Ctx }>({
    ctx: async ({ }, use) => {
        const ctx = {} as Ctx;
        await use(ctx);
    },
});

export const { Given, When, Then } = createBdd(test);