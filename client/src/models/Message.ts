export type Message = {
  sender: string;
  receiver: string;
  users: string[];
  createdAt: Date;
  value: string;
}