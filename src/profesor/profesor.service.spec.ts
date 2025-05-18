import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crear un nuevo profesor', async () => {
    const profesor: ProfesorEntity = {
      id: 1 as any,
      nombre: faker.person.fullName(),
      cedula: faker.number.int({ min: 100000000, max: 999999999 }),
      departamento: faker.person.jobTitle(),
      extension: faker.number.int({ min: 10000, max: 99999 }),
      esParEvaluador: faker.datatype.boolean(),
      mentorias: [],
      evaluaciones: [],
    };

    const result = await service.create(profesor);
    expect(result).toEqual(profesor);
  });
});
