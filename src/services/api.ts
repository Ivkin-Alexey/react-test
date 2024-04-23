import { IUser } from "../types/types";
import { LOADING_TIME } from "../assets/constants";

export function createUserList(start: number, end: number): IUser[] {
const users = [];
for (let i = start; i < end; i++) {
  const user = {
    name: `User ${i}`,
    department: `Department ${Math.floor(Math.random() * 5) + 1}`,
    company: `Company ${Math.floor(Math.random() * 3) + 1}`,
    jobTitle: `Job Title ${Math.floor(Math.random() * 4) + 1}`
  };
  users.push(user);
}
return users;
}

export async function fetchData(start: number, end: number): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => resolve(createUserList(start, end)), LOADING_TIME);
        } catch (e) {
            reject(e);
        }
    })
}