import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { EvaluacionEntity } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';

describe('EvaluacionService', () => {
  let service: EvaluacionService;
  let repository: Repository<EvaluacionEntity>;
  let profesorRepository: Repository<ProfesorEntity>;
  let estudianteRepository: Repository<EstudianteEntity>;
  let proyectoRepository: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EvaluacionService],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    repository = module.get<Repository<EvaluacionEntity>>(getRepositoryToken(EvaluacionEntity));
    profesorRepository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    estudianteRepository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('crear una nueva evaluacion', async () => {
    const profesor = await profesorRepository.save({
      id: 1 as any,
      nombre: faker.person.fullName(),
      cedula: faker.number.int({ min: 100000000, max: 999999999 }),
      departamento: faker.person.jobTitle(),
      extension: faker.number.int({ min: 1000, max: 9999 }),
      esParEvaluador: faker.datatype.boolean(),
      mentorias: [],
      evaluaciones: [],
    });
    const evaluadoor = await profesorRepository.save({
      id: 2 as any,
      nombre: faker.person.fullName(),
      cedula: faker.number.int({ min: 100000000, max: 999999999 }),
      departamento: faker.person.jobTitle(),
      extension: faker.number.int({ min: 1000, max: 9999 }),
      esParEvaluador: faker.datatype.boolean(),
      mentorias: [],
      evaluaciones: [],
    });
    const estudiante = await estudianteRepository.save({
      id: 3 as any,
      nombre: faker.person.fullName(),
      cedula: faker.number.int({ min: 100000000, max: 999999999 }),
      semestre: faker.number.int({ min: 4, max: 10 }),
      programa: faker.person.jobTitle(),
      promedio: faker.number.int({ min: 3.2, max: 5 }),
      proyectos: [],
    });
    const proyectoo = await proyectoRepository.save({
      id: 4 as any,
      titulo: faker.person.jobTitle(),
      mentor: profesor,
      notafinal: faker.number.int({ min: 0, max: 5 }),
      estado: faker.number.int({ min: 0, max: 4 }),
      area: faker.person.jobTitle(),
      presupuesto: faker.number.int({ min: 1000, max: 10000 }),
      fechainicio: faker.date.past().toString(),
      fechafin: faker.date.future().toString(),
      evaluaciones: [],
      lider: estudiante
    });

    const evaluacion: EvaluacionEntity = {
      id: 1 as any,
      proyecto: proyectoo,
      evaluador: evaluadoor,
    };

    const newEvaluacion: EvaluacionEntity = await service.create(evaluacion);
    expect(newEvaluacion).not.toBeNull();

    const storedEvaluacion: EvaluacionEntity | null = await repository.findOne({ where: { id: newEvaluacion.id }, relations: ['proyecto', 'evaluador'] });
    expect(storedEvaluacion).not.toBeNull();
    expect(storedEvaluacion!.evaluador!.id).toEqual(newEvaluacion.evaluador!.id);
    expect(storedEvaluacion!.proyecto!.id).toEqual(newEvaluacion.proyecto!.id);
  });

  it('no se puede crear una nueva evaluacion', async () => {
    const profesor = await profesorRepository.save({
      id: 1 as any,
      nombre: faker.person.fullName(),
      cedula: faker.number.int({ min: 100000000, max: 999999999 }),
      departamento: faker.person.jobTitle(),
      extension: faker.number.int({ min: 1000, max: 9999 }),
      esParEvaluador: faker.datatype.boolean(),
      mentorias: [],
      evaluaciones: [],
    });
    const estudiante = await estudianteRepository.save({
      id: 3 as any,
      nombre: faker.person.fullName(),
      cedula: faker.number.int({ min: 100000000, max: 999999999 }),
      semestre: faker.number.int({ min: 4, max: 10 }),
      programa: faker.person.jobTitle(),
      promedio: faker.number.int({ min: 3.2, max: 5 }),
      proyectos: [],
    });
    const proyectoo = await proyectoRepository.save({
      id: 4 as any,
      titulo: faker.person.jobTitle(),
      mentor: profesor,
      notafinal: faker.number.int({ min: 0, max: 5 }),
      estado: faker.number.int({ min: 0, max: 4 }),
      area: faker.person.jobTitle(),
      presupuesto: faker.number.int({ min: 1000, max: 10000 }),
      fechainicio: faker.date.past().toString(),
      fechafin: faker.date.future().toString(),
      evaluaciones: [],
      lider: estudiante
    });

    const evaluacion: EvaluacionEntity = {
      id: 1 as any,
      proyecto: proyectoo,
      evaluador: profesor,
    };
    try {
      await service.create(evaluacion);
    } catch (e) {
      expect(e.message).toEqual('El proyecto no puede ser evaluado por su mentor');
    }
  });

});
