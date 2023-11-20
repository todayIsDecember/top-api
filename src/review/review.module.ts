import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, reviewSchema } from './review.model';
import { ReviewService } from './review.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: ReviewModel.name, schema: reviewSchema }])],
	controllers: [ReviewController],
	providers: [ReviewService],
})
export class ReviewModule {}
