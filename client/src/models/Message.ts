export type Message = {
  sender: string;
  receiver: string;
  users: string[];
  createdAt: Date;
  value: string;
}

export type SingleMessage = {
  sender: string;
  createdAt: Date;
  value: string;
  groupId: string;
  usersSeen: string[]
}