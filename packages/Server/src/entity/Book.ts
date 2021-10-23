import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MAX_BOOK_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH } from "@dl/shared"
@ObjectType()
@Entity("books")
export class Book extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ length: MAX_BOOK_TITLE_LENGTH })
    title: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    imageUrl: string

    @Field()
    @Column({ length: MAX_DESCRIPTION_LENGTH })
    description: string

    @ManyToOne(type => User, user => user.createdBooks, { nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    creator: User
}