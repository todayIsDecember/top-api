import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PageModel } from './page.model';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { FindPageDto } from './dto/find-page.dto';

@Injectable()
export class PageService {
	constructor(@InjectModel(PageModel.name) private readonly pageModel: Model<PageModel>) {}

	async create(dto: CreatePageDto): Promise<PageModel> {
		return this.pageModel.create(dto);
	}

	async findById(id: string) {
		return this.pageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return this.pageModel.findOne({ alias }).exec();
	}

	async findByCategory(firstCategory: FindPageDto): Promise<PageModel[]> {
		return this.pageModel
			.aggregate([
				{
					$match: {
						firstCategory: firstCategory.firstCategory,
					},
				},
				{
					$group: {
						_id: {
							secondCategory: '$secondCategory',
						},
						pages: {
							$push: { alias: '$alias', title: '$title' },
						},
					},
				},
			])
			.exec();
	}
	async deleteById(id: string) {
		return this.pageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreatePageDto) {
		return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
}
