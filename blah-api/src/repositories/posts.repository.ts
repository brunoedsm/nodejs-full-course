import { queryBuilder } from '../core/db/index';

export class PostsRepository {
    
    public static async getPublicPosts(search?: string, page?: number): Promise<any> {
        return queryBuilder
                    .select('name', 'username', 'gravatar_hash', 'text', 'posts.created_at')
                    .from('posts')
                    .leftOuterJoin('users', 'users.id', 'posts.id_user')
                    .orderBy('posts.created_at', 'desc');
    }

    public static async create(text: string, userId: number): Promise<number[]> {
        return queryBuilder.insert({
            id_user: userId,
            text
        }).into('posts');
    }

    public static async followersPosts(userId: number, page?: number): Promise<any> {
        return queryBuilder.raw(`
            SELECT 
                name,
                username,
                gravatar_hash,
                text,
                posts.created_at
            FROM
                posts
            JOIN
                (
                    SELECT users.* FROM users
                    LEFT JOIN (
                        SELECT id_followee FROM follows WHERE id_user = :user_id
                    ) AS follows ON id_followee = id
                    WHERE id_followee = id OR id = :user_id
                ) AS users ON id_user = users.id
            ORDER BY posts.created_at DESC
        `, { user_id: userId });
    }
}