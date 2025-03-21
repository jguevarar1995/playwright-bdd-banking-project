import { Page, TestInfo } from '@playwright/test';

export const attachEvidence = async (page: Page, testInfo: TestInfo) => {
    const screenshot = await page.screenshot();
    await testInfo.attach('Screenshot:', {
        body: screenshot,
        contentType: 'image/png',
    })
}