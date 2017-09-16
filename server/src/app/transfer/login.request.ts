import { IsString, IsInt, MinLength, MaxLength, Matches, Length } from 'class-validator';

export class LoginRequest {
    @IsString()
    @Length(5, 25)
    @Matches(/^[a-z0-9]*$/i)
    username: string
    
    @IsString()
    @Length(8, 64)
    password: string
}