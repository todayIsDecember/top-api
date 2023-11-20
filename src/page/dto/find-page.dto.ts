import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../page.model';

export class FindPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;
}
