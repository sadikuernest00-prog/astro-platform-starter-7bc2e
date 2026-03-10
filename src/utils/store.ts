export type User = {
  id: number
  name: string
}

export type TrustLine = {
  from: number
  to: number
  limit: number
  used: number
}

export type Payment = {
  from: number
  to: number
  amount: number
  time: number
}

export const users: User[] = []
export const trustLines: TrustLine[] = []
export const payments: Payment[] = []

let nextUserId = 1

export function createUser(name: string) {
  const user = { id: nextUserId++, name }
  users.push(user)
  return user
}
