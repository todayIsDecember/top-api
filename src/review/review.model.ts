import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MScema } from 'mongoose';
import { ProductModel } from 'src/product/product.model';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true })
export class ReviewModel {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	rating: number;

	@Prop({ type: MScema.Types.ObjectId, ref: ProductModel.name })
	productId: ProductModel;
}

export const reviewSchema = SchemaFactory.createForClass(ReviewModel);
