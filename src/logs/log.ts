import { host, isFork } from "fork-with-emitter";

export default async (type: string, payload?: any) => {
  if (type === "error") console.error(type, payload);
  else console.log(type, payload);

  if (!isFork) return;

  await host.emit("log", { type, payload });
};
