import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, productSchema } from './product.model';
import { ProductService } from './product.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: ProductModel.name, schema: productSchema }])],
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule {}
