import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

class ProductCharacteristics {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

@Schema()
export class ProductModel {
	@Prop({ required: true })
	image: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	price: number;

	@Prop()
	oldPrice?: number;

	@Prop()
	credit: number;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	advantages: string;

	@Prop({ required: true })
	disAdvantages: string;

	@Prop({ type: () => [String], required: true })
	categories: string[];

	@Prop({ type: () => [String], required: true })
	tags: string[];

	@Prop({ type: () => [ProductCharacteristics], required: true, _id: false })
	characteristics: ProductCharacteristics[];
}

export const productSchema = SchemaFactory.createForClass(ProductModel);
