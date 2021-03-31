import puppeteer from 'puppeteer'

//wraps function to accept Puppeteer Elements
export default (fn: puppeteer.EvaluateFn) =>
  async (element: puppeteer.ElementHandle, ...args: any) =>
    await element.executionContext().evaluate(fn, element, ...args)