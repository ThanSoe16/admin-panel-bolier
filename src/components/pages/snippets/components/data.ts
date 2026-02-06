import { User } from "./types";


export const users: User[] = Array.from({ length: 100 }, (_, index) => ({
  id: (index + 1).toString(),
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  image: "/temp/honey.jpeg",
}));


export const fetchUsers = (page: number, limit: number): User[] => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return users.slice(start, end);
};
