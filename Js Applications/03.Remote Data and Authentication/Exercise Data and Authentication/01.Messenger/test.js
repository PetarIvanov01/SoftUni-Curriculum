const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

const url = 'http://127.0.0.1:5500/01.Messenger/index.html'

describe('Tests', async function () {
    this.timeout(6000);
    let browser, page;

    before(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 1000 });
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    })
    afterEach(async () => {
        await page.close();
    })


    it('Test if all the messages are loaded and showed on the webpage by clicking the "Refresh" button', async () => {

        await page.goto(url);
        await page.click('text=Refresh');
        const textArea = await page.locator('#messages').inputValue();

        expect(textArea).to.include('Spami: Hello, are you there?')
    })
    it('If the send btn is clicked send message', async () => {

        await page.goto(url);
        await page.fill('input[id=author]', 'Author');
        await page.fill('input[id=content]', 'content');

        const [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'POST'),
            page.click('text=Send')
        ])
        const data =JSON.parse(request.postData());

        expect(data.author).to.equal('Author')
        expect(data.content).to.equal('content')
    })


})