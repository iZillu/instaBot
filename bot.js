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
	
const CHROME_BIN_PATH = '/Users/hmuravch/Desktop/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';


const options = new chromeDriver.Options();
options.setChromeBinaryPath(CHROME_BIN_PATH);
options.addArguments(
	// 'disable-gpu',
	// 'headless',
);

var browser = new webdriver.Builder()
	.withCapabilities(webdriver.Capabilities.chrome())
	.setChromeOptions(options)
	.build();

/*
//  тут должна быть настройка log4js`
//  но это будет потом )))
*/

async function logIn() {
	try {
		await browser.get('https://www.instagram.com/accounts/login/');
		let button = await browser.wait(until.elementLocated(By.name('username')), 10000);
		await button.sendKeys(settings.bot_log);
		await browser.findElement(By.name('password')).sendKeys(settings.bot_pass);
		await browser.findElement(By.css("button[type='submit']")).click();
		await browser.wait(until.elementLocated(By.className('piCib')), 10000);
		await console.log("Loged in");
	} catch (err) {
		console.log(err);
	}
};



async function watchStories() {
	try {
		for (let i = 0; settings.hashtags[i]; i++)
		{
			for (let story = 1; story < 3; story++)
			{
				await console.log("search " + settings.hashtags[i]);
				await browser.get("https://www.instagram.com/explore/tags/" + settings.hashtags[i]);
				const btn = await browser.wait(until.elementLocated(By.css("div > img._7A2D8")), 10000)
					.then( elem => {
						return browser.wait(until.elementIsVisible(elem), 10000);
					})		
				await btn.click();
				await console.log("start wathing stories");
				while (1)
				{
					const arrow = await browser.wait(until.elementLocated(By.css(".coreSpriteRightChevron")), 10000);
					await arrow.click();
					var check = await browser.findElement(By.css("div > img._7A2D8"))
						.then(() => {
						return true;
					}, (err) => {
						if (err instanceof webdriver.error.NoSuchElementError) {
							return false;
						} else {
							webdriver.promise.rejected(err);
						}
					});
					if (check)
						break ;
				}
				if (story == 1)
					console.log("reload page " + story + " time");
				else
					console.log("reload page " + story + " times");
			}
		}
	} catch (err) {
		console.log(err);
	}
};

logIn().then( () => {
	watchStories()
	.then(() => {
		browser.quit();
	})
});






// elm = browser.wait(until.findElement(By.xpath(llala)))
// elm.click()