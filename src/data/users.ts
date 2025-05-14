import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@gadgethub.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
  },
];

// For demo purposes, these would be the credentials
export const credentials = {
  admin: {
    email: 'admin@gadgethub.com',
    password: 'admin123',
  },
  user: {
    email: 'john@example.com',
    password: 'user123',
  },
};