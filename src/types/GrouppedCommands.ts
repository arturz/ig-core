import Command from "./Command";

type GroupedCommands = {
  type: string;
  commands: Command[];
}[];

export default GroupedCommands;
