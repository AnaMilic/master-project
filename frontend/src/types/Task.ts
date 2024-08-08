import { User } from "./User";

export type Task={
    _id: string,
    title: string,
    description: string | undefined,
    type: string,
    priority: string,
    status: string,
    userDeveloper:User,
    userTester:User,
    userId: string
};

