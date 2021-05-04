import { Page } from "puppeteer";
import { getAllCommands } from "../../commands";

export default async (page: Page) => {
  const commands = getAllCommands(page);

  await Promise.all(
    commands.map(async ({ name, fn }) => {
      return page.exposeFunction(name, fn);
    })
  );
};
