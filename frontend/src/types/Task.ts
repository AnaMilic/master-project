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
    userDeveloper2:User,
    userTester2:User,
    requiredTime: string,
    userId: string
};

