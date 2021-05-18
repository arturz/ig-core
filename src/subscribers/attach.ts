import { Page } from "puppeteer";
import onFailedLogin from "./onFailedLogin";
import onFollow from "./onFollow";
import onHostMessage from "./onHostMessage";
import onLikePost from "./onLikePost";
import onLogin from "./onLogin";

export default (page: Page) => {
  onFollow();
  onLikePost();
  onLogin();
  onFailedLogin();
  onHostMessage(page);
};
