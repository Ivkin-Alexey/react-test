import { IUser } from "../../types/types";
import { LOADING_TIME, FETCHED_USER_LIST_LENGTH } from "../constants";

export function createUserList(numberFrom: number): IUser[] {
const users = [];
for (let i = numberFrom; i < numberFrom + FETCHED_USER_LIST_LENGTH; i++) {
  const user = {
    name: `User ${i + 1}`,
    department: `Department ${Math.floor(Math.random() * 5) + 1}`,
    company: `Company ${Math.floor(Math.random() * 3) + 1}`,
    jobTitle: `Job Title ${Math.floor(Math.random() * 4) + 1}`
  };
  users.push(user);
}
return users;
}

export async function fetchData(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => resolve(createUserList(FETCHED_USER_LIST_LENGTH)), LOADING_TIME);
        } catch (e) {
            reject(e);
        }
    })
}