import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { FindPageDto } from './dto/find-page.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { PageService } from './page.service';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { PAGE_NOT_FOUND } from './page.constants';

@Controller('page')
export class PageController {
	constructor(private readonly pageService: PageService) {}
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreatePageDto) {
		return this.pageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.pageService.findById(id);
		if (!page) {
			throw new NotFoundException(PAGE_NOT_FOUND);
		}
		return page;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const page = await this.pageService.findByAlias(alias);
		if (!page) {
			throw new NotFoundException(PAGE_NOT_FOUND);
		}
		return page;
	}
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedPage = await this.pageService.deleteById(id);
		if (!deletedPage) {
			throw new NotFoundException(PAGE_NOT_FOUND);
		}
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreatePageDto) {
		const updatedPage = await this.pageService.updateById(id, dto);
		if (!updatedPage) {
			throw new NotFoundException(PAGE_NOT_FOUND);
		}
		return updatedPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindPageDto) {
		return this.pageService.findByCategory(dto);
	}
}
