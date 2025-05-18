import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;
  let evaluacionRepository: Repository<EvaluacionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    evaluacionRepository = module.get<Repository<EvaluacionEntity>>(getRepositoryToken(EvaluacionEntity));
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

  it('no se puede crear un nuevo profesor', async () => {
    const profesor: ProfesorEntity = {
      id: 1 as any,
      nombre: faker.person.fullName(),
      cedula: faker.number.int({ min: 100000000, max: 999999999 }),
      departamento: faker.person.jobTitle(),
      extension: faker.number.int({ min: 100000, max: 999999 }),
      esParEvaluador: faker.datatype.boolean(),
      mentorias: [],
      evaluaciones: [],
    };

    try {
      await service.create(profesor);
    } catch (error) {
      expect(error.message).toBe('La extensión debe tener exactamente 5 dígitos');
  }});

  it('asignar evaluador a un profesor', async () => {
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

    const evaluacion: EvaluacionEntity = {
      id: 1 as any
    };
    await evaluacionRepository.save(evaluacion);
    const evaluacionId = evaluacion.id;

    await repository.save(profesor);
    const result = await service.asignarEvaluador(profesor.id, evaluacionId);
    expect(result.id).toEqual(profesor.id);
    expect(result.evaluaciones[0].id).toEqual(evaluacion.id);
  });


  it('no se puede asignar evaluador a un profesor', async () => {
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

    const evaluacion: EvaluacionEntity = {
      id: 1 as any
    };
    const evaluacionId = evaluacion.id;

    await repository.save(profesor);
    try{
      await service.asignarEvaluador(profesor.id, evaluacionId);
    } catch (error) {
      expect(error.message).toBe('Evaluación no encontrada');
    }
  });
});
