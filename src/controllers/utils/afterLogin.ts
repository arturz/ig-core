import { Page } from "puppeteer";
import log from "../../logs/log";
import closeDialog from "../../services/dialog/closeDialog";
import gotoIndex from "../../services/index/gotoIndex";
import clickButton from "../../services/navigation/clickButton";
import sleep from "../../utils/sleep";

/*
  Zapisać Twoje dane logowania?
  Możemy zapisać Twoje dane logowania w tej przeglądarce, aby uniknąć konieczności ich ponownego wprowadzania.

  Zapisz informacje

  Nie teraz
*/
const oneTapPath = "/accounts/onetap";

export default async (page: Page) => {
  if (page.url().includes(oneTapPath)) {
    log("onetap");
    await clickButton(page);
    await sleep(3000, 6000);
  }

  try {
    await closeDialog(page);
    await sleep(1000, 2000);
  } catch (error) {}

  //do some random actions
  await gotoIndex(page);
  await sleep(2000);
};
