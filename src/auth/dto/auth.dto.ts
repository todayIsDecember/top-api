import { IsEmail, IsEnum, IsString } from 'class-validator';
export class AuthDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}
