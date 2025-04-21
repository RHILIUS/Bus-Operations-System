import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

type PrismaModelName =
  | 'quota_Policy'
  | 'stop'
  | 'route'
  | 'routeStop'
  | 'busAssignment'
  | 'busRouteAssignment'

// Generic ID generator
export async function generateFormattedID(
  modelName: PrismaModelName,
  field: string,
  prefix: string,
  padding: number = 4
): Promise<string> {
  const model = (prisma as any)[modelName] as {
    findFirst: Function
  }

  if (!model?.findFirst) {
    throw new Error(`Model "${modelName}" not found or findFirst is not available.`)
  }

  const lastRecord = await model.findFirst({
    orderBy: {
      [field]: 'desc',
    },
    select: {
      [field]: true,
    },
  })

  let nextNumber = 1

  if (lastRecord && typeof lastRecord[field] === 'string') {
    const match = lastRecord[field].match(/\d+$/)
    if (match) {
      nextNumber = parseInt(match[0]) + 1
    }
  }

  return `${prefix}-${nextNumber.toString().padStart(padding, '0')}`
}