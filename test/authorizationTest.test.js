const { chromium } = require("playwright");
const {email, password} = require("../user");

    //positive test
(async () => {
        const browser = await chromium.launch({
            headless: false,
            slowMo: 5000,
          });
        const page = await browser.newPage();
        await page.goto("https://netology.ru/?modal=sign_in", {
          waitUntil: 'load',
          timeout: 0
          });
        await page.locator('[placeholder="Email"]').fill(email);
        await page.locator('[placeholder="Пароль"]').fill(password);
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
      await page.goto("https://netology.ru/?modal=sign_in", {
        waitUntil: 'load',
        timeout: 0
        });
      await page.locator('[placeholder="Email"]').fill("login@mail.ru");
      await page.locator('[placeholder="Пароль"]').fill("qwerty1");
      await page.locator('button:has-text("Войти")').click();
      await expect(page).toHaveURL("https://netology.ru/profile");
      await expect(page.locator('._-packages-ui-kit-components-v2-Input--error--1QFF1  div'))
      .toHaveText('Вы ввели неправильно логин или пароль');
      await browser.close();
  })();

   