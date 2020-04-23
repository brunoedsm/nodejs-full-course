import { Request, Response } from 'express';
import AuthRepository from '../repositories/auth.repository';
import { UsersRepository } from '../repositories/users.repository';

class AuthController {

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body;
            const token = await AuthRepository.attemptLogin(username, password);

            return res.json({ token });
        } catch (err) {
            return res.status(401).json({
                message: 'Bad credentials',
                error: err.message
            });
        }
    }

    public async signUp(req: Request, res: Response): Promise<Response> {
        try {
            const { email, username, name, password } = req.body;
            const [ userId ] = await AuthRepository.register(username, password, name, email);

            if (userId > 0) {
                const token = await AuthRepository.attemptLogin(username, password);
                return res.json({ token });
            }

            return res.status(400).json();
        } catch (err) {
            return res.status(400).json({
                message: 'Bad request',
                error: err.message
            });
        }
    }

    public async profile(req: Request, res: Response): Promise<Response> {
        const { decodedToken: { user_id }} = res.locals;

        const user = await UsersRepository.byId(user_id);
        const info = await UsersRepository.userInfo(user_id);

        return res.json({ user, info: info[0][0] });
    }

    public async logout(req: Request, res: Response): Promise<Response> {
        return res.json('logout');
    }
}

export default new AuthController();