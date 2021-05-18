import { Page } from "puppeteer";
import challenge from "./controllers/challenge";
import followingBot from "./controllers/followingBot";
import login from "./controllers/login";
import createDevtools from "./loaders/page/createDevtools";
import closeDialog from "./services/dialog/closeDialog";
import confirmDialog from "./services/dialog/confirmDialog";
import gotoIndex from "./services/index/gotoIndex";
import goBackFromLikedBy from "./services/likedBy/goBack";
import gotoFollowing from "./services/myProfile/following/gotoFollowing";
import gotoProfile from "./services/myProfile/gotoProfile";
import getLikes from "./services/post/getLikes";
import gotoLikedBy from "./services/post/gotoLikedBy";
import likePost from "./services/post/likePost";
import scrollToNextPost from "./services/post/scrollToNextPost";
import getVisiblePost from "./services/post/selectors/getVisiblePost";
import unlikePost from "./services/post/unlikePost";
import Command from "./types/Command";
import GroupedCommands from "./types/GrouppedCommands";

export const getGroupedCommands = (page: Page): GroupedCommands =>
  [
    {
      type: "Dialogs",
      commands: [
        {
          name: "confirmDialog",
          title: "Confirm dialog",
          fn: () => confirmDialog(page),
        },
        {
          name: "closeDialog",
          title: "Close dialog",
          fn: () => closeDialog(page),
        },
      ],
    },
    {
      type: "Navigation",
      commands: [
        {
          name: "gotoIndex",
          title: "Home",
          fn: () => gotoIndex(page),
        },
        {
          name: "gotoProfile",
          title: "My profile",
          fn: () => gotoProfile(page),
        },
        {
          name: "gotoFollowing",
          title: "My followers",
          fn: () => gotoFollowing(page),
        },
      ],
    },
    {
      type: "Posts",
      commands: [
        {
          name: "scrollToNextPost",
          title: "Scroll to next post",
          fn: () => scrollToNextPost(page),
        },
        {
          name: "likePost",
          title: "Like",
          fn: async () => await likePost(await getVisiblePost(page)),
        },
        {
          name: "unlikePost",
          title: "Unlike",
          fn: async () => await unlikePost(await getVisiblePost(page)),
        },
        {
          name: "getLikes",
          title: "Get amount of likes",
          fn: async () => await getLikes(await getVisiblePost(page)),
        },
        {
          name: "gotoLikedBy",
          title: "Show who liked",
          fn: async () => await gotoLikedBy(await getVisiblePost(page)),
        },
        {
          name: "goBackFromLikedBy",
          title: "Go back from who liked",
          fn: async () => await goBackFromLikedBy(page),
        },
      ],
    },
    {
      type: "Signing in",
      commands: [
        {
          name: "login",
          title: "Sign in",
          fn: () => login(page),
        },
        {
          name: "challenge",
          title: "Enter SMS verification code",
          fn: (code: string) => challenge(page, code),
        },
      ],
    },
    {
      type: "Automation",
      commands: [
        {
          name: "followingBot",
          title: "Follow x new people",
          fn: async (maximum: number) => await followingBot(page, maximum),
        },
      ],
    },
    {
      type: "R&D",
      commands: [
        {
          name: "throw",
          title: "Throw an error",
          fn: (error: string) => {
            if (!error) throw `test`;

            throw error;
          },
        },
        {
          name: "createDevTools",
          title: "Open phone's devtools",
          fn: async () => await createDevtools(page),
        },
      ],
    },
  ].map((group) => ({
    ...group,
    commands: group.commands.map((command: Omit<Command, "arity">) => ({
      ...command,
      arity: command.fn.length,
    })),
  }));

export const getAllCommands = (page: Page) =>
  getGroupedCommands(page)
    .map((group) => group.commands)
    .flat();

export const runCommand = (page: Page, name: string, ...args: any[]) => {
  const command = getAllCommands(page).find((command) => command.name === name);

  if (!command) throw `There is no command ${name}`;

  return command.fn(...args);
};
