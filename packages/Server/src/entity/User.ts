import { Length, Min } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { Book } from "./Book";
import { Role } from "@dl/shared";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {

    @Index()
    @PrimaryGeneratedColumn()
    id: number;

    @Length(3, 50)
    @Column({ unique: true })
    @Field()
    username: string;

    @Length(3, 256)
    @Column({ unique: true })
    email: string

    @Column({
        type: "enum",
        enum: Role,
        default: Role.Consumer
    })
    @Field(type => Role, { nullable: true })
    role: Role

    @OneToMany(type => Book, book => book.creator)
    createdBooks: Book[]

    @ManyToMany(type => Book)
    @JoinTable({ name: "borowing" })
    @Field(type => [Book], { nullable: true })
    borowing: Book[]

    @Length(3, 256)
    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
