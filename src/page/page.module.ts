import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PageModel, pageSchema } from './page.model';
import { PageService } from './page.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: PageModel.name, schema: pageSchema }])],
	controllers: [PageController],
	providers: [PageService],
})
export class PageModule {}
