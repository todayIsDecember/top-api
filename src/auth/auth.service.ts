import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcryptjs';
import { USER_NOT_FOUND, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const newUser = new this.authModel({
			email: dto.email,
			passwordHash: await hash(dto.password, salt),
		});

		return newUser.save();
	}

	async findUser(email: string) {
		return this.authModel.findOne({ email }).exec();
	}

	async deleteUser(email: string) {
		return this.authModel.findOneAndDelete({ email }).exec();
	}

	async getAllUsers(): Promise<AuthModel[]> {
		return this.authModel.find();
	}

	async validateUser(email: string, password: string): Promise<Pick<AuthModel, 'email'>> {
		const user = await this.findUser(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND);
		}
		const correctPassword = await compare(password, user.passwordHash);
		if (!correctPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}

		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
