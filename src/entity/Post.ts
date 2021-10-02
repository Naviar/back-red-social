import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    postName: string;

    @Column()
    content: string;

    @CreateDateColumn()
    createdDate: Date;

    @Column()
    likes: number;

    @Column()
    dislikes:number;

    @Column()
    emailCreator: string;

}