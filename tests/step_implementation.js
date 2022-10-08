/* globals gauge*/

const path = require('path');
const assert = require('assert');
const { openBrowser, closeBrowser, screenshot, goto, write, into, text, $, waitFor, click } = require('taiko');


beforeSuite(async () => {
	await openBrowser({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
});

afterSuite(async () => {
	await closeBrowser();
});


gauge.customScreenshotWriter = async function () {
	const screenshotFilePath = path.join(
		process.env['gauge_screenshots_dir'],
		`screenshot-${process.hrtime.bigint()}.png`,
	);

	await screenshot({
		path: screenshotFilePath,
	});
	return path.basename(screenshotFilePath);
};

step('Open <link>', async (link) => {
	await goto(link);
});


// After opening the browser

step('Given empty todo list', async () => {
	assert.ok(await $('#list').exists());
});

step(
	'When I write <text> to <input> textbox and click <button> button',
	async (text, input, button) => {
		await write(text, into($('#text-input')));
		await waitFor(1000);
		await click(button);
	},
);

step('Then I should see <write> item in the todo list', async (write) => {
	assert.ok(await text(write).exists());
});