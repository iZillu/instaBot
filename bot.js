require('chromedriver');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    promise = require('promise');
	
const settings = require('./settings.json');
const random = require('./suppSoft');
const sleep = require('system-sleep');
const min = 200;
const max = 400;
	


// const chrome = require('selenium-webdriver/chrome');
// let options = new chrome.Options()
// options.addArguments("--no-sandbox", "--disable-gpu", "--headless", "--remote-debugging-port=")
// let browser = new webdriver.Builder()
// .withCapabilities(webdriver.Capabilities.chrome())
// .setChromeOptions(options)
// .build();

// var capabilities = webdriver.Capabilities.chrome();

// capabilities.set('chromeOptions', {
//       'args': ['--disable-plugins']
// });

// var browser = new webdriver.Builder().forBrowser('chrome').withCapabilities(capabilities).build();

var browser = new webdriver.Builder()
	.forBrowser('chrome')
	.withCapabilities(webdriver.Capabilities.chrome())
	.build();

/*
//  тут должна быть настройка log4js`
//  но это будет потом )))
*/

const logIn = async () => {
	try { 
		await browser.get('https://www.instagram.com/accounts/login/');
		await browser.findElement(By.name('username')).sendKeys(settings.bot_log);
		await browser.findElement(By.name('password')).sendKeys(settings.bot_pass);
		await browser.findElement(By.xpath("//button[contains(@type,'submit')]")).click();
		await console.log("Loged in");
	} catch (err) {
		console.log ("Log in failed");
	}
}

logIn();

(async function () {
	for (let i = 0; settings.hashtags[i]; i++)
	{
		await browser.get("https://www.instagram.com/explore/tags/" + settings.hashtags[i]);
		console.log("search " + settings.hashtags[i]);
		await browser.findElement(By.xpath("/html[1]/body[1]/span[1]/section[1]/main[1]/header[1]/div[1]/div[1]/div[1]")).click();
		console.log("start wathing stories");
		for (let story = 0; story < 1; story++)
		{
			while (1)
			{
				const check = await browser.findElement(By.className("coreSpriteRightChevron")).isDisplayed();
				if (check)
					await check.click();
				else
					break ;
				await sleep(random.randomInteger(min, max));
			}
			console.log("reload " + story + " times");
			browser.navigate().refresh();
		}
	}
})();

browser.quit();





// elm = browser.wait(until.findElement(By.xpath(llala)))
// elm.click()