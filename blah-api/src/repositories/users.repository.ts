import { queryBuilder } from '../core/db/index';
export class UsersRepository {

    public static async byId(userId: number): Promise<any> {
        return queryBuilder
                    .select()
                    .from('users')
                    .where('id', '=', userId)
                    .first();
    }

    public static async userInfo(userId: number): Promise<any> {
        const sql = `
            SELECT
                blah_count,
                IF (
                    text IS NULL,
                    'You have no posts',
                    text
                ) AS text,
                followers,
                following
            FROM
                (
                    SELECT COUNT(*) AS blah_count FROM posts WHERE id_user = :user_id
                ) AS BC
            LEFT JOIN
                (
                    SELECT id_user, text FROM posts WHERE id_user = :user_id ORDER BY created_at DESC LIMIT 1
                ) AS B ON B.id_user = :user_id
            JOIN
                (
                    SELECT COUNT(*) AS followers FROM follows WHERE id_followee = :user_id
                ) AS FE
            JOIN
                (
                    SELECT COUNT(*) AS following FROM follows WHERE id_user = :user_id
                ) AS FR
        `;

        return queryBuilder.raw(sql, { user_id: userId });
    }
}