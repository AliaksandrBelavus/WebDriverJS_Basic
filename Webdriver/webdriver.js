const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");
const caps = new Capabilities();
const expect = require("chai").expect;
caps.setPageLoadStrategy("normal");

(async function example() {
  let driver = await new Builder()
    .withCapabilities(caps)
    .forBrowser("chrome")
    .build();
  try {
    await driver.get("https://www.apc.com/");
    await driver.manage().window().maximize();

    // Choosing country
    await driver
      .findElement(By.xpath('//a[contains(text(), "United States")]'))
      .click();

    // Search for an item
    await driver
      .findElement(By.css('input[placeholder="Search apc.com"]'))
      .sendKeys("UPS 500", Key.ENTER);

    // Add first 2 items from search to comparison
    await driver
      .findElement(
        By.xpath('//li[1]//div[@class="result-list__item-comparison"]'))
      .click();
    await driver
      .findElement(
        By.xpath('//li[2]//div[@class="result-list__item-comparison"]'))
      .click();
    await driver
      .findElement(By.xpath('//a[contains(text(),"Compare Now")]'))
      .click();
    await driver.manage().setTimeouts({ implicit: 30000 });

    // Highlight Differences
    await driver
      .findElement(By.xpath('//label[input[@id="highlightDifference"]]'))
      .click();

    // Delete all items from comparison
    await driver
      .findElement(By.css("button.analytics-compare-clear-list"))
      .click();

    // Log to the console label that the comparison is cleared
    let finalResult = await driver.wait(
      until.elementLocated(By.xpath("//h4")),
      10000
    );
    expect(await finalResult.getText()).to.be.eql("No items in comparison.");
  } finally {
    await driver.quit();
  }
})();
