const { generateText, checkAndGenerate } = require('./util');
const puppeteer = require('puppeteer');

//unit tests
test('should output age and name', () =>{
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');
    const text2 = generateText('Anna', 20);
    expect(text2).toBe('Anna (20 years old)');
});

test('should output data-less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
})

test('should output data-less text', () => {
    const text = generateText();
    expect(text).toBe('undefined (undefined years old)');
})

//integration test

test('should generate a valid text output', () =>{
    const text = checkAndGenerate('Max', 29);
    expect(text).toBe('Max (29 years old)');
});

//e2e test

test('should click around', async () =>{
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto(
        'file:///D:/projects/js-testing-introduction/index.html'
    );
    await page.click('input#name');
    await page.type('input#name', 'Anna');

    await page.click('input#age');
    await page.type('input#age', '28');

    await page.click('#btnAddUser');

    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Anna (28 years old)');

}, 10000); /* add 10 seconds because jest default test time is 
                5 seconds and our test takes more than 5 seconds */
