import { IsNumber, IsDate, IsUrl, IsString, IsOptional, IsInt, MaxLength, NotContains, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class ProfileRequest {
    @IsOptional()
    @IsString()
    @MaxLength(25)
    @NotContains(" ")
    displayname: string
    
    @IsOptional()
    @IsString()
    @MaxLength(255)
    @IsUrl()
    homepage: string

    @IsOptional()
    @IsInt()
    @Max(100000)
    @Min(-100000)
    luckynumber: number
}