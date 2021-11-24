describe("Protractor Simply Test", function () {
  it("Simple flight search script", function () {
    browser.get("https://www.matrix.usag.it/");
    browser.manage().window().maximize();

    //Choosing a language
    element(by.css('div[class="languageselector ng-scope"]')).click();
    element(by.css("span[ng-click=\"changeLanguage('en')\"]")).click();

    // Start a project
    element(by.css('a[href="configurateur.html"]')).click();
    element(by.css("li[ng-click=\"modeconfiguration='prefab'\"]")).click();
    element(by.css('li[ng-click="nextStep()"]')).click();
    browser.manage().setTimeouts({ implicit: 30000 });

    // Choose brand and model
    element(by.css('img[ng-src="custom/marques/peugeot.jpg"]')).click();
    element(
      by.css(
        'div[data-prefab="/brands/prefabs/COMPO A1.mtx"][ng-repeat="prefab in prefabs"]'
      )
    ).click();
    element(by.css('li[ng-click="nextStep()"]')).click();
    browser.manage().setTimeouts({ implicit: 30000 });
    element(by.css('li[ng-click="nextStep()"]')).click();
    element(by.css('input[ng-model="barsQuantity"]')).sendKeys(2);
    element(
      by.css(
        'button[class="ngdialog-button ngdialog-button-primary close-dialog ng-binding"]'
      )
    ).click();

    //Add the number of accessories
    element(by.css("input.ng-pristine.ng-untouched.ng-valid")).sendKeys(2);
    element(by.css("button.ng-binding")).click();

    //Checking the displayed number of accessories
    expect(element(by.css("div.pied p span.ng-binding")).getText()).toEqual("12");
    browser.close();
  });
});
