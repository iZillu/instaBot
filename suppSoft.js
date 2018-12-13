module.exports = {
    randomInteger: function (min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
      }
    //   const until = webdriver.until;

    //     var user = driver.wait(until.elementLocated(By.id('email')), timeout);
    //     user.sendKeys(username);          / until element doesn't exist - timeout
};