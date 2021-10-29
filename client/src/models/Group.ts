import { SingleMessage } from './Message';

export type Group = {
  users: string[]
  createdAt: Date
  messages: SingleMessage[]
  groupId: string
  administrator: string[]
}