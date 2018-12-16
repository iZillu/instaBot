require('chromedriver');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    promise = require('promise');

const chromeDriver = require('selenium-webdriver/chrome');
const settings = require('./settings.json');
const random = require('./suppSoft');
const sleep = require('system-sleep');
const min = 30;
const max = 70;
	


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

const CHROME_BIN_PATH = '/Users/hmuravch/goinfre/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';

const options = new chromeDriver.Options();
options.setChromeBinaryPath(CHROME_BIN_PATH);
options.addArguments(
    'disable-gpu',
);
var capabilities = webdriver.Capabilities.chrome();

var browser = new webdriver.Builder()
	.withCapabilities(webdriver.Capabilities.chrome())
	.setChromeOptions(options)
	.build();

/*
//  тут должна быть настройка log4js`
//  но это будет потом )))
*/

// const logIn = async () => {
// 	try { 
// 		await browser.get('https://www.instagram.com/accounts/login/');
// 		await browser.findElement(By.name('username')).sendKeys(settings.bot_log);
// 		await browser.findElement(By.name('password')).sendKeys(settings.bot_pass);
// 		await browser.findElement(By.xpath("//button[contains(@type,'submit')]")).click();
// 		await console.log("Loged in");
// 	} catch (err) {
// 		console.log ("Log in failed");
// 	}
// }

// logIn();

(async function () {
	try {
		await browser.get('https://www.instagram.com/accounts/login/');
		let button = await browser.wait(until.elementLocated(By.name('username')), 5000);
		await button.sendKeys(settings.bot_log);
		await browser.findElement(By.name('password')).sendKeys(settings.bot_pass);
		await browser.findElement(By.xpath("//button[contains(@type,'submit')]")).click();
		await console.log("Loged in");

		for (let i = 0; settings.hashtags[i]; i++)
		{
			await browser.wait(until.elementLocated(By.className('piCib')), 5000);
			// let btn = await browser.wait(until.elementLocated(By.xpath("/html[1]/body[1]/span[1]/section[1]/main[1]/header[1]/div[1]/div[1]/div[1]")), 5000);
			// await btn.click();
			await console.log("start wathing stories");
			for (let story = 0; story < 2; story++)
			{
				await browser.get("https://www.instagram.com/explore/tags/" + settings.hashtags[i]);
				await console.log("search " + settings.hashtags[i]);
				await browser.wait(until.elementLocated(By.xpath("/html[1]/body[1]/span[1]/section[1]/main[1]/header[1]/div[1]/div[1]/div[1]")), 5000);
				await browser.findElement(By.xpath("/html[1]/body[1]/span[1]/section[1]/main[1]/header[1]/div[1]/div[1]/div[1]")).click();
				while (1)
				{
					await browser.wait(until.elementLocated(By.className("coreSpriteRightChevron")), 2000);
					await browser.findElement(By.className("coreSpriteRightChevron")).click();
					browser.findElement(By.xpath("//button[@type='button']")).isDisplayed();
					if ()
						break ;
					// await sleep(random.randomInteger(min, max));
					// let check = await browser.findElement(By.className("coreSpriteRightChevron"));
					// const check = await browser.findElement(By.className("coreSpriteRightChevron"));
					// console.log(check.isDisplayed());
					// console.log(check);
					// if (check.isDisplayed())
					// await check.click();
					// else
					// 	break ;
					// sleep(300);
				}
				console.log("reload " + story + " times");
			}
		}
		browser.quit();
	} catch (err) {
		console.log(err);
	}
})();





// elm = browser.wait(until.findElement(By.xpath(llala)))
// elm.click()