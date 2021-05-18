type Command = {
  name: string;
  title: string;
  fn: (...args: any[]) => any;
  arity: number;
};

export default Command;
