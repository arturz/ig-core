import { Page } from 'puppeteer'
import { getSupervisors } from '../../supervisors'

export default async (page: Page) => {
  const supervisors = getSupervisors(page)

  await Promise.all(
    Object.entries(supervisors)
    .map(async ([ fnName, fn ]) => {
      page.exposeFunction(fnName, fn)
    })
  )
}