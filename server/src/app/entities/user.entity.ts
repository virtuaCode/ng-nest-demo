import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Index } from "typeorm";
import { Exclude, Expose } from "class-transformer";


@Entity()
export class User {

    constructor(username: string, displayname: string, password: string) {
        this.username = username ? username.toLowerCase() : username;
        this._displayname = displayname;
        this.password = password;
        this.created = new Date();
    }

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
    readonly username: string;

    @Exclude()
    @Column({ nullable: true })
    private _displayname: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    readonly created: Date;

    @Column({ type: "int", nullable: true })
    luckynumber: number;

    @Column({ nullable: true})
    homepage: string;

    @Expose()
    get displayname(): string {
        return this._displayname ? this._displayname : this.username;
    }

    set displayname(name: string) {
        this._displayname = name;
    }

}