const {Builder, By, until} = require("selenium-webdriver");
const expect = require('chai').expect;
var driver = new Builder().forBrowser("chrome").build();
driver.manage().window().maximize(); 

describe ('Count of Members in Iron Maiden', function() {

    it('Should search and open Iron Maiden Page from initial page', async function() {
        await driver.get("https://www.wikipedia.org/");
        const btnSelectEnglishVersion = driver.findElement(By.id("js-link-box-en"));
        await btnSelectEnglishVersion.click();
        driver.wait(until.elementLocated(By.xpath("//*[@placeholder='Search Wikipedia']")))
        .sendKeys("Iron Maiden");
        await driver.findElement(By.xpath("//*[@type='submit' and @name='go']")).click();
        const arcticMonkeysPageTitle = await driver.findElement(By.css(".firstHeading")).getText();
        expect(arcticMonkeysPageTitle).to.be.equal("Iron Maiden");
    });    

    it('Should check that Iron Maiden has 19 members', async function() {
        await driver.get("https://en.wikipedia.org/wiki/Iron_Maiden");
        const arrayOfMembers = await driver.findElements(By.css("td.infobox-data > ul > li [href^='/']"));
        const countOfMembers = arrayOfMembers.length;
        expect(countOfMembers).to.be.equal(19);
    });

    it('Should open Bruce Dickinson page from Members category', async function() {
        await driver.get("https://en.wikipedia.org/wiki/Iron_Maiden");
        const alexTurnerBtn = driver.findElement(By.css("td.infobox-data > ul > li:nth-child(4) [href^='/']"));
        await alexTurnerBtn.click();
        const alexTurnerPageTitle = await driver.findElement(By.css(".firstHeading")).getText();
        expect(alexTurnerPageTitle).to.be.equal("Bruce Dickinson");
        driver.quit();
    });

});