import { Role } from '@prisma/client';

export interface IUserData {
  name: string;
  email: string;
  phone: string;
  isPremium: boolean;
}

export interface IAdminUserData {
  id: number;
  role: Role;
  name?: string;
  email?: string;
  phone?: string;
  isBlocked: boolean;
  createdAt: string;
  _count: {
    orders: number;
    chatMessages: number;
    chatSessions: number;
  };
}
