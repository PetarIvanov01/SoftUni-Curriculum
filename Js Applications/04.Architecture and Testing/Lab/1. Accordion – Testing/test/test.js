const { chromium } = require('playwright-chromium')
const { expect } = require('chai');

let browser;
let page;
//'http://127.0.0.1:5500/05.%20Accordion/index.html'

describe("E2E tests", async function () {
    this.timeout(6000)

    before(async () => { browser = await chromium.launch({ headless: false,slowMo:1000 }); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('Test for all spans contents', async () => {
        await page.goto('http://127.0.0.1:5500/05.%20Accordion/index.html');
        await page.waitForLoadState();

        const titles = await page.locator('div.head>span');
        let [first, second, third, forth] = await titles.allTextContents();

        expect(first).to.equal('Scalable Vector Graphics');
        expect(second).to.equal('Open standard');
        expect(third).to.equal('Unix');
        expect(forth).to.equal('ALGOL');
    })

    it('Show more text', async () => {
        await page.goto('http://127.0.0.1:5500/05.%20Accordion/index.html');
        await page.waitForLoadState();

        await page.getByText('More').first().click();

        const visible = await page.isVisible('div.extra');
        expect(visible).to.be.true;

        const content = await page.locator('div.extra p').first().allTextContents();
        expect(content.length).to.be.greaterThan(0);

    })
    it('Show less text', async () => {
        await page.goto('http://127.0.0.1:5500/05.%20Accordion/index.html');
        await page.waitForLoadState();

        await page.getByText('More').first().click();

        let visible = await page.isVisible('div.extra');
        expect(visible).to.be.true;

        await page.getByText('Less').first().click();
        visible = await page.isVisible('div.extra');
        expect(visible).to.be.false;
    })

})