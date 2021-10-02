import {Router} from 'express';
import PostController from '../controllers/post.controller';

export default class PostRouter { 

    public router : Router;
    private controller: PostController;

    constructor(){
        this.router = Router();
        this.controller = new PostController();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/',this.controller.getPosts);
        this.router.post('/',this.controller.createPost);
        this.router.put('/:id',this.controller.updatePost);
    }

}