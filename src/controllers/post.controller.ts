import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ResponseApi } from "../dtos/web/response/ResponseApi";
import { ResponseGetPost } from "../dtos/web/ResponseGetPostDto";
import { Post } from "../entity/Post";
import ReactionUseCaseImpl from "../use-cases/impl/ReactionPost.UseCaseImpl";
import UtilResponse from "../utils/response.util";


const reactionPostUseCase: ReactionUseCaseImpl = new ReactionUseCaseImpl();


export default class PostController {


    constructor(){}

    public async getPosts(request: Request, response: Response<ResponseApi<ResponseGetPost>>){

            const posts = await getRepository(Post).find({order:{
                createdDate: "DESC"
            }});
            return response.json(UtilResponse.buildResponse(`${posts.length} posts were obtained`, posts));
           
    }

    
    public async createPost(request: Request, response: Response): Promise<Response>{
        try {

             const post = getRepository(Post).create(request.body);
             const result = await getRepository(Post).save(post);
             return response.json(UtilResponse.buildResponse(`new post was created for the user ${request.body.emailCreator}`,result));
        }
        catch(exception) {
            console.log(`Error: ${exception}`);
            return response.status(500).json(UtilResponse.buildResponse(`Error save post for user: <${request.body.emailCreator}>`));
        }
    }

    public async updatePost(request: Request, response: Response): Promise<Response>{
        try {
            const {id} = request.params;
            const reactionType: ReactionTypes = request.body.type;
            if(await reactionPostUseCase.addReaction(id,reactionType)){
                return response.json(UtilResponse.buildResponse(`updated the post with id <${id}> new <${reactionType}>!`));
            }
            else {
                return response.json(UtilResponse.buildResponse(`no post found with id <${id}> to add new like <${reactionType}>`));
            }

        }
        catch(exception){
            console.log(exception);
            return response.status(500).json(UtilResponse.buildResponse(`an error occurred updating the post with id:  ${request.params.id}`,null));
        }
    }
        
}