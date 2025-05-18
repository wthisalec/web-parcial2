import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudianteList: EstudianteEntity[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedEstudiantes();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  const seedEstudiantes = async () => {
    await repository.clear();
    estudianteList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante: EstudianteEntity = await repository.save({
        nombre: faker.person.fullName(),
        cedula: faker.number.int({ min: 100000000, max: 999999999 }),
        semestre: faker.number.int({ min: 4, max: 10 }),
        programa: faker.person.jobTitle(),
        promedio: faker.number.int({ min: 3.2, max: 5 }),
        proyectos: []})
        estudianteList.push(estudiante);
    }}

  it('crear un nuevo estudiante', async () => {
    const estudiante: EstudianteEntity = {
      id: 1 as any,
      nombre: faker.person.fullName(),
      cedula: faker.number.int({ min: 100000000, max: 999999999 }),
      semestre: faker.number.int({ min: 4, max: 10 }),
      programa: faker.person.jobTitle(),
      promedio: faker.number.int({ min: 3.2, max: 5 }),
      proyectos: []}

      const newEstudiante: EstudianteEntity = await service.create(estudiante);
      expect(newEstudiante).not.toBeNull();

      const storedEstudiante: EstudianteEntity | null = await repository.findOne({where: {id: newEstudiante.id}, relations: ['proyectos']});
      expect(storedEstudiante).not.toBeNull();
      expect(storedEstudiante!.nombre).toEqual(estudiante.nombre);
      expect(storedEstudiante!.cedula).toEqual(estudiante.cedula);
      expect(storedEstudiante!.semestre).toEqual(estudiante.semestre);
      expect(storedEstudiante!.programa).toEqual(estudiante.programa);
      expect(storedEstudiante!.promedio).toEqual(estudiante.promedio);
      expect(storedEstudiante!.proyectos).toEqual(estudiante.proyectos)
    });

    it('no se puede crear un nuevo estudiante', async () => {
    const estudiante: EstudianteEntity = {
      id: 2 as any,
      nombre: faker.person.fullName(),
      cedula: faker.number.int({ min: 100000000, max: 999999999 }),
      semestre: faker.number.int({ min: 1, max: 10 }),
      programa: faker.person.jobTitle(),
      promedio: faker.number.int({ min: 1, max: 5 }),
      proyectos: []}

      try {
        await service.create(estudiante);
      } catch (e) {
        expect(e.message).toEqual('El promedio debe ser mayor a 3.2 y el semestre igual o mayor a 4');
      }
    });

    it('eliminar un estudiante', async () => {
      const estudiante: EstudianteEntity = estudianteList[0];
      await service.delete(estudiante.id);
      const deletedEstudiante: EstudianteEntity | null = await repository.findOne({ where: { id: estudiante.id } })
      expect(deletedEstudiante).toBeNull();
    });

    it('no se puede eliminar porque no se encuentra el estudiante', async () => {
      const nonExistentId = 99999 as any;
      try {
      await service.delete(nonExistentId);
      } catch (e) {
      expect(e.message).toEqual('Estudiante no encontrado');
      }
    });

});