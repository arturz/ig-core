# ig-core [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> This repo contains core functionalities for controlling Instagram with the Puppeteer.

It shouldn't be used as a standalone module but as a part of some bigger Node application, for example [ig-relay](https://github.com/arturz/ig-relay).

## Requirements

- [fork-with-emitter](https://github.com/arturz/fork-with-emitter) npm module

## Implementation

1. Clone this repo's source

2. Compile it with `npm run build`

3. Import root folder (where package.json is located) from your application. Default export points to the function that creates a new bot instance.

## Example

```javascript
import createBot from "../ig-core";

const bot = await createBot({
  dataDir: "./chrome-data",
  env: {
    LOGIN: "Instagram login",
    PASSWORD: "Instagram password",
  },
});

bot.fork.process.once("exit", someAction);
bot.fork.process.once("error", somAction);

await bot.start();
await bot.executeCommand("login"); // sign in
```

## Environment variables

- `LOGIN` - instagram login
- `PASSWORD` - instagram password

## Exported function and interfaces

```typescript
import { Fork } from "fork-with-emitter";

export default function createBot(props: CreateBotProps): Promise<Bot> {...}

interface CreateBotProps {
  // path to Chrome's datadir
  dataDir: string,

  // environment variables
  env?: [key: string]: string,
}

export interface Data {
  name: string;
  payload?: string;
}

type GroupedCommands = {
  type: string;
  commands: {
    name: string;
    title: string;
    fn: (...args: any[]) => any;
    arity: number;
  }[];
}[];

export interface Bot {
  // fork-with-emitter's Fork object
  fork: Fork;

  // initializes Puppeteer and loads an Instagram page
  start: () => Promise<void>;

  // tells the fork to exit process
  exit: () => void;

  // list of commands is available under src/commands.ts
  executeCommand: (data: Data, maximumExecutionTime?: number) => Promise<any>;
  getCommands: () => Promise<GroupedCommands>;
}
```
