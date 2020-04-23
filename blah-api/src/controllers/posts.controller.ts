import { Response, Request } from 'express';
import { PostsRepository } from '../repositories/posts.repository';

class PostsController {

    public async getAll(req: Request, res: Response): Promise<Response> {
        // TODO: falta paginação

        const posts = await PostsRepository.getPublicPosts();
        return res.json({ posts });
    }
    
    public async create(req: Request, res: Response): Promise<Response> {
        const { text } = req.body;
        const { decodedToken: { user_id }} = res.locals;
        const [postId] = await PostsRepository.create(text, user_id);

        return res.json({ postId });
    }
    
    public async friendsPosts(req: Request, res: Response): Promise<Response> {
        // TODO: falta paginação 

        const { decodedToken: { user_id }} = res.locals;
        const posts = await PostsRepository.followersPosts(user_id);

        return res.json({ posts: posts[0] });
    }
}

export default new PostsController();