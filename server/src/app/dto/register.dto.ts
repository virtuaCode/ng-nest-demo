import { IsString, IsInt, MaxLength, MinLength, Matches, NotContains } from 'class-validator';

export class RegisterDto {

    @IsString()
    @MaxLength(25)
    @NotContains(" ")
    displayname: string

    @IsString()
    @MinLength(5)
    @MaxLength(25)
    @Matches(/^[a-z0-9]*$/i)
    username: string
    
    @IsString()
    @MinLength(8)
    @MaxLength(64)
    password: string
}