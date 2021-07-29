import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("books")
export class Book extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ length: 256 })
    name: string

    @Field()
    @Column()
    imageUrl: string

    @Field()
    @Column({ length: 4096 })
    description: string

    @ManyToOne(type => User, user => user.createdBooks, { nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    creator: User
}