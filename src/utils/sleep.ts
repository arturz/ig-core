import sleep from 'sleep-promise'
import random from 'random-int'

export default async (min: number, max?: number) =>
  await sleep(
    max === undefined
      ? min
      : random(min, max)
  )