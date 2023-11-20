import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const userTest: AuthDto = {
	email: 'test@test.com',
	password: 'password',
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdEmail: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/register (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/register')
			.send(userTest)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdEmail = body.email;
			});
	});
	it('/auth/register (POST) - fail', () => {
		return request(app.getHttpServer()).post('/auth/register').send(userTest).expect(400);
	});
	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(userTest)
			.expect(200)
			.then(({ body }: request.Response) => {
				token = body.access_token;
			});
	});
	it('/auth/login (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...userTest, password: 'afv' })
			.expect(401);
	});
	it('/auth (DELETE) - success', async () => {
		return request(app.getHttpServer())
			.delete('/auth/' + createdEmail)
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.then(({ body }: request.Response) => {
				body.deletedCount === 1;
			});
	});
	it('/auth (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/auth/' + 'test2@test.com')
			.set('Authorization', 'Bearer ' + token)
			.expect(404);
	});
	afterAll(() => {
		disconnect();
	});
});
