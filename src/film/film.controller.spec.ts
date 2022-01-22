import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './film.controller';

describe('FilmController', () => {
  let controller: FilmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmController],
    }).compile();

    controller = module.get<FilmController>(FilmController);
  });

  it.only('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
