import { resolve } from "path";

const login = process.env.LOGIN || "";

const password = process.env.PASSWORD || "";

const screenshotDelay = process.env.SCREENSHOT_DELAY
  ? parseInt(process.env.SCREENSHOT_DELAY)
  : 100;

//if (!login) throw `No instagram login provided (LOGIN env)`;
//if (!password) throw `No instagram password provided (PASSWORD env)`;

const controlled = process.env.CONTROLLED === "1";

const headless = process.env.HEADLESS === "1";

const production = process.env.NODE_ENV === "production";

const cookies = process.env.COOKIES
  ? JSON.parse(process.env.COOKIES)
  : production
  ? {}
  : process.argv[2]
  ? { sessionid: process.argv[2] }
  : {};

const dataDir = process.env.DATA_DIR || resolve(process.cwd(), "account_data");

const device = process.env.DEVICE || "Pixel 2";

const getEnvData = () => ({
  login,
  password,
  controlled,
  headless,
  production,
  cookies,
  dataDir,
  device,
  screenshotDelay,
});

export default getEnvData;

console.log(getEnvData());
