import { host, isFork } from "fork-with-emitter";

export default async (login: string) => {
  if (!isFork) return false;

  await host.request("isFollowed", login);
};
