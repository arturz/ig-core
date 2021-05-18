import { host, isFork } from "fork-with-emitter";

export const wasFollowedBefore = async ({ login }: { login: string }) => {
  if (!isFork) return false;

  return await host.request<boolean>("wasFollowedBefore", login);
};

export const markAsFollowed = async ({ login }: { login: string }) => {
  host.emit("markAsFollowed", login);
};
