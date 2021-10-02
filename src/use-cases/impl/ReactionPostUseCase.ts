export interface ReactionPostUseCase {
    addReaction(idPost: string,reactionType: ReactionTypes):Promise<boolean>;
}