import { IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5, {
		message: 'рейтинг не може бути більший 5',
	})
	@Min(1, {
		message: 'рейтинг не може бути менший 1',
	})
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}
