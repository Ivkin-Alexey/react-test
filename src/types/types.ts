export interface IUser {
    name: string, 
    department: string, 
    company: string, 
    jobTitle: string
}

export type TypeUserList = IUser[];

export type TypeFetchedUsers = TypeUserList[];
