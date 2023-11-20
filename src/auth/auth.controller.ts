import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { USER_ALREDY_EXIST, USER_NOT_FOUND } from './auth.constants';
import { JWTAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const createdUser = await this.authService.findUser(dto.email);
		if (createdUser) {
			throw new BadRequestException(USER_ALREDY_EXIST);
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		const { email } = await this.authService.validateUser(dto.email, dto.password);
		return this.authService.login(email);
	}

	@UseGuards(JWTAuthGuard)
	@Delete(':email')
	async delete(@Param('email') email: string) {
		const deletedUser = await this.authService.deleteUser(email);
		if (!deletedUser) {
			throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return deletedUser.email;
	}

	@HttpCode(200)
	@Get()
	async getAllUsers() {
		return this.authService.getAllUsers();
	}
}
