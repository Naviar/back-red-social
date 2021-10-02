'use-strict';
import { getRepository } from "typeorm";
import { Post } from "../../entity/Post";
import { ReactionPostUseCase} from "./ReactionPostUseCase";

export default class ReactionUseCaseImpl implements ReactionPostUseCase {

    constructor(){}

    public async addReaction(idPost: string, reactionType: ReactionTypes): Promise<boolean> {
        const result = await getRepository(Post).createQueryBuilder()
            .update()
            .set({
                    likes: () =>  ReactionTypes.LIKE === reactionType ? "likes + 1" :"likes",
                    dislikes: () => ReactionTypes.DISLIKE === reactionType ? "dislikes + 1" :"dislikes"
                })
            .whereInIds(idPost)
            .execute();
            return result.affected != undefined && result.affected > 0;
    }

 
    
}