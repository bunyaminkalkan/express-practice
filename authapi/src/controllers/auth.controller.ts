import { Request, Response, NextFunction } from "express";
import { connectToDatabase } from "../db/connection";
import { User } from "../models/user.model";
import { Collection } from "couchbase";

async function getUsersCollection(): Promise<Collection> {
    const dbConnection = await connectToDatabase();
    return dbConnection.usersCollection;
}

async function getUsersCount(collection: Collection): Promise<number> {
    const queryResult = await collection.cluster.query(
        `SELECT COUNT(*) AS count FROM \`authbucket\`.\`auth\`.\`users\`;`
    );
    const count = queryResult.rows[0].count;
    return count;
}

export const register = async (req: Request, res: Response, next: NextFunction) => {

    const { username, password } = req.body;
    const usersCollection = await getUsersCollection();
    const usersCount = await getUsersCount(usersCollection);
    const user: User = {
        id: usersCount + 1,
        username: username,
        password: password
    };
    usersCollection.insert(user.id.toString(), user);
    next();
}

export const login = async (req: Request, res: Response, next: NextFunction) => {

    const { username, password } = req.body;
    return res.status(200).json({
        data: {
            username,
            password
        }
    })
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {

    const { username, password } = req.body;

}