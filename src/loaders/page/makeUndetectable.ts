import puppeteer from 'puppeteer'

export default async (page: puppeteer.Page) => {
  await page.evaluateOnNewDocument(preload)
}

const preload = () => {
  // overwrite the `languages` property to use a custom getter
  Object.defineProperty(navigator, "languages", {
    get: function() {
      return ["en-US", "en"];
    }
  });

  // overwrite the `plugins` property to use a custom getter
  Object.defineProperty(navigator, 'plugins', {
    get: function() {
      // this just needs to have `length > 0`, but we could mock the plugins too
      return [1, 2, 3, 4, 5];
    }
  });

  Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined,
  })
}