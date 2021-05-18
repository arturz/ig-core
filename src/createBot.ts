import { createFork, Fork } from "fork-with-emitter";
import { join } from "path";
import GroupedCommands from "./types/GrouppedCommands";

export interface Data {
  name: string;
  payload?: string;
}

export interface Bot {
  fork: Fork;
  start: () => void;
  exit: () => void;
  executeCommand: (data: Data, maximumExecutionTime?: number) => Promise<any>;
  getCommands: () => Promise<GroupedCommands>;
}

export default async function createBot({
  dataDir,
  env = {},
}: {
  dataDir: string;
  env?: {
    [key: string]: string;
  };
}) {
  const fork = createFork("app.js", {
    cwd: join(__dirname),
    env: {
      HEADLESS: "1",
      ...env,
      CONTROLLED: "1",
      COOKIES: "{}",
      DATA_DIR: dataDir,
    },
  });

  let started = false;

  return {
    fork,
    async start() {
      if (started === false) {
        await fork.request("start", null, 120);
        started = true;
      }
    },
    exit() {
      fork.emit("exit");
    },
    async executeCommand(data: Data, maximumExecutionTime = 60 * 30) {
      return await fork.request("executeCommand", data, maximumExecutionTime);
    },
    async getCommands(): Promise<GroupedCommands> {
      return await fork.request("getCommands");
    },
  };
}
