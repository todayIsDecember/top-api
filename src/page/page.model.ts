import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export type PageDocument = HydratedDocument<PageModel>;

export class HhData {
	@Prop(Number)
	count: number;

	@Prop(Number)
	juniorSalary: number;

	@Prop(Number)
	middleSalary: number;

	@Prop(Number)
	seniorSalary: number;
}

export class PageAdvantage {
	@Prop(String)
	title: string;

	@Prop(String)
	description: string;
}

@Schema()
export class PageModel {
	@Prop({ required: true, enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop({ required: true })
	secondCategory: string;

	@Prop({ required: true, unique: true })
	alias: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	category: string;

	@Prop({ type: Object })
	hh?: HhData;

	@Prop({ required: true, type: () => [PageAdvantage] })
	advantages: PageAdvantage[];

	@Prop({ required: true })
	seoText: string;

	@Prop({ required: true })
	tagsTitle: string;

	@Prop({ required: true, type: () => [String] })
	tags: string[];
}

export const pageSchema = SchemaFactory.createForClass(PageModel);
