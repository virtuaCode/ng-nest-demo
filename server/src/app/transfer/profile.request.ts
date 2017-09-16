import { IsNumber, IsDate, IsUrl, IsString, IsOptional, IsInt } from "class-validator";
import { Type } from "class-transformer";

export class ProfileRequest {
    @IsOptional()
    @IsString()
    displayname: string
    
    @IsOptional()
    @IsString()
    @IsUrl()
    homepage: string

    @IsOptional()
    @IsInt()
    luckynumber: number
}