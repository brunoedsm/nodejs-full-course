import { createHash } from "crypto";
import { queryBuilder } from '../core/db';
import { sign } from 'jsonwebtoken';

export default class AuthRepository {

    public static async attemptLogin(username: string, password: string): Promise<string> {
        password = createHash('sha256').update(password).digest('hex');
        const user: any =  await queryBuilder
                                    .select()
                                    .from('users')
                                    .where('username', '=', username)
                                    .andWhere('password', '=', password)
                                    .first();
        
        return new Promise((resolve, reject) => {
            if (user) {
                const token = sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 31),
                    username: user.username,
                    email: user.email,
                    user_id: user.id
                }, 'MyVerySecretKeyForThisToken');

                resolve(token);
            }

            reject(new Error('Bad credentials!'));
        });
    }

    public static async register(username: string, password: string, name: string, email: string): Promise<number[]> {
        password = createHash('sha256').update(password).digest('hex');
        const gravatar = createHash('md5').update(email).digest('hex');

        return queryBuilder.insert({
            username,
            email,
            password,
            name,
            gravatar_hash: gravatar,
        }).into('users');
    }
}