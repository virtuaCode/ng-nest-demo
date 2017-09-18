import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Index } from "typeorm";
import { Exclude, Expose } from "class-transformer";


export const Groups = {
    USER: { groups: ["user"] },
    PROFILE: { groups: ["profile"]},
    USER_PROFILE: {groups: ["user","profile"]}
}

@Entity()
@Exclude()
export class User {

    constructor(username: string, displayname: string, password: string) {
        this.username = username ? username.toLowerCase() : username;
        this._displayname = displayname;
        this.password = password;
        this.created = new Date();
    }

    @Expose(Groups.USER_PROFILE)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Expose(Groups.USER)
    @Column({ unique: true })
    readonly username: string;

    @Column({ nullable: true })
    private _displayname: string;

    @Column()
    password: string;

    @Expose(Groups.USER)
    @Column()
    readonly created: Date;

    @Expose(Groups.PROFILE)
    @Column({ type: "int", nullable: true })
    luckynumber: number;

    @Expose(Groups.PROFILE)
    @Column({ nullable: true })
    homepage: string;

    @Expose(Groups.USER_PROFILE)
    get displayname(): string {
        return this._displayname ? this._displayname : this.username;
    }

    set displayname(name: string) {
        this._displayname = name;
    }

}