import { resolve } from "path";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import devices from "puppeteer/DeviceDescriptors";
import getEnvData from "../config/getEnvData";
import exposeDevFns from "./page/exposeDevFns";

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

export default async () => {
  const userDataDir = resolve(getEnvData().dataDir, "chrome");
  console.log(`userDataDir: ${userDataDir}`);

  const browser = await puppeteer.launch({
    headless: getEnvData().headless,
    userDataDir,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  browser.on("disconnected", () => {
    throw "Browser disconnected";
  });

  const page = await browser.newPage();
  page.on("error", (msg) => {
    throw "Page crashed";
  });

  /*const block = ['graph.instagram.com/logging_client_events', 'instagram.com/logging/falco', 'instagram.com/logging/arwing']
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    if(block.includes(page.url()))
      request.abort();
    else
     request.continue();
  })*/

  /*const cookies = Object.entries(getEnvData().cookies).reduce((cookies: any[], [name, value]) => {
    cookies.push({
      name,
      //@ts-ignore
      value,
      domain: '.instagram.com',
      path: '/',
      httpOnly: true,
      secure: true,
      expires: Math.round(+new Date(new Date().setFullYear(new Date().getFullYear() + 1))/1000)
    })
    return cookies
  }, [])*/

  const device = getEnvData().device;
  if (devices[device] === undefined) throw `Unknown device "${device}"!`;

  await page.emulate(devices[device]);
  console.log(`device: ${device}`);

  await exposeDevFns(page);

  //await page.setCookie(...cookies)
  await page.goto("https://instagram.com/");

  //await page.evaluate(sessionid => document.cookie = `sessionid=${sessionid}`, '2859946592%3AYzIhmdX9OP2bYr%3A29')

  //console.log(getEnvData().cookies)

  //@ts-ignore
  //await page.evaluate(cookies => cookies.map(([name, value]) => { document.cookie=`${name}=${value}` }), Object.entries(getEnvData().cookies))

  await page.reload();

  await page.evaluate(() => window.stop());

  return page;
};
