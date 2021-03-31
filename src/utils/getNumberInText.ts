export default (text: string) =>
  Number(
    Array.prototype.reduce.call(text, (acc, char) => {
      if(isNaN(Number(char)) || /\s/.test(char))
        return acc 
      return acc+char
    }, '')
  )