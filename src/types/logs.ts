import { User } from './auth';

export type Log = {
  id: number;
  message: string;
  timestamp: string;
  user: User;
};
