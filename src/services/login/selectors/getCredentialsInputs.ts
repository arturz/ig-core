import { Page } from "puppeteer";
import LoginInput from "../../../types/login/LoginInput";
import PasswordInput from "../../../types/login/PasswordInput";
import getForm from "./getForm";

export default async (page: Page): Promise<[LoginInput, PasswordInput]> => {
  const form = await getForm(page);
  const [loginInput, passwordInput] = await form.$$("input");

  if (loginInput === undefined) throw `There's no login input`;

  if (passwordInput === undefined) throw `There's no password input`;

  return [loginInput, passwordInput];
};
