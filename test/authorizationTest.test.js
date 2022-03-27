const { expect } = require("@playwright/test");
const { chromium } = require("playwright");
const user = require("./user");

    //positive test
(async () => {
        const browser = await chromium.launch({
            headless: false,
            slowMo: 5000,
          });
        const page = await browser.newPage();
        await page.goto("https://netology.ru/?modal=sign_in");
        await page.locator('[placeholder="Email"]').fill(user.email);
        await page.locator('[placeholder="Пароль"]').fill(user.password);
        await page.locator('button:has-text("Войти")').click();
        await expect(page).toHaveURL("https://netology.ru/profile");
        await expect(page.locator('class="components-pages-Profile-Programs--title--NCjbp"').toHaveText("Мои курсы и профессии"));
        await browser.close();
    })();

    //negative test
   (async () => {
        const browser = await chromium.launch({
            headless: false,
            slowMo: 5000,
          });
        const page = await browser.newPage();
        await page.goto("https://netology.ru/?modal=sign_in");
        await page.locator('[placeholder="Email"]').fill(user.invalidEmail);
        await page.locator('[placeholder="Пароль"]').fill(user.invalidPassword);
        await page.locator('button:has-text("Войти")').click();
        await expect(page).toHaveURL("https://netology.ru/profile");
        await expect(page.locator('._-packages-ui-kit-components-v2-Input--error--1QFF1  div'))
        .toHaveText('Вы ввели неправильно логин или пароль');
        await browser.close();
    })();
