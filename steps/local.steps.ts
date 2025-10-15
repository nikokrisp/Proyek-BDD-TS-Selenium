import { Builder, By, until, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { Before, After, Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import assert from "assert";

let driver: WebDriver;
setDefaultTimeout(30 * 1000);

Before(async () => {
  const chromedriverPath = `${process.cwd()}\\chromedriver-win64\\chromedriver.exe`;
  const service = new chrome.ServiceBuilder(chromedriverPath);
  const options = new chrome.Options();
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeService(service)
    .setChromeOptions(options)
    .build();
});

After(async () => {
  await driver.quit();
});

Given('I open {string}', async (url: string) => {
  await driver.get(url);
});

When('I fill in {string} with {string}', async (id: string, value: string) => {
  const field = await driver.wait(until.elementLocated(By.id(id)), 5000);
  await field.clear();
  await field.sendKeys(value);
});

When('I click the button with id {string}', async (id: string) => {
  const btn = await driver.wait(until.elementLocated(By.id(id)), 5000);
  await btn.click();
});

Then('I should see {string}', async (expectedText: string) => {
  const body = await driver.wait(until.elementLocated(By.tagName("body")), 5000);
  const text = await body.getText();
  assert.ok(text.includes(expectedText), `Expected to see "${expectedText}", but got "${text}"`);
});
