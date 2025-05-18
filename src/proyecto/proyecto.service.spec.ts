import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crear proyecto', async () => {
    const proyecto: ProyectoEntity ={
      id: 1 as any,
      titulo: faker.lorem.sentence(15),
      area: faker.lorem.word(),
      presupuesto: faker.number.int({ min: 1000, max: 10000 }),
      notafinal: faker.number.int({ min: 0, max: 5 }),
      estado: faker.number.int({ min: 1, max: 4 }),
      fechainicio: faker.date.past().toISOString(),
      fechafin: faker.date.future().toISOString(),
      evaluaciones: [],
    }
    const newProyecto: ProyectoEntity = await service.crearProyecto(proyecto);
    expect(newProyecto).not.toBeNull();
    expect(newProyecto!.titulo).toEqual(proyecto.titulo);
    expect(newProyecto!.area).toEqual(proyecto.area);
    expect(newProyecto!.presupuesto).toEqual(proyecto.presupuesto);
    expect(newProyecto!.notafinal).toEqual(proyecto.notafinal);
    expect(newProyecto!.estado).toEqual(proyecto.estado);
    expect(newProyecto!.fechainicio).toEqual(proyecto.fechainicio);
    expect(newProyecto!.fechafin).toEqual(proyecto.fechafin);
});

  it('no se puede crear proyecto', async () => {
    const proyecto: ProyectoEntity ={
      id: 1 as any,
      titulo: faker.lorem.sentence(10),
      area: faker.lorem.word(),
      presupuesto: faker.number.int({ min: 1000, max: 10000 }),
      notafinal: faker.number.int({ min: 0, max: 5 }),
      estado: faker.number.int({ min: 1, max: 4 }),
      fechainicio: faker.date.past().toISOString(),
      fechafin: faker.date.future().toISOString(),
      evaluaciones: [],
    }
    try {
      await service.crearProyecto(proyecto);
    } catch (e) {
      expect(e.message).toEqual('El título debe tener más de 15 caracteres');
    }});

    it('avanzar proyecto', async () => {
      const proyecto: ProyectoEntity ={
        id: 1 as any,
        titulo: faker.lorem.sentence(15),
        area: faker.lorem.word(),
        presupuesto: faker.number.int({ min: 1000, max: 10000 }),
        notafinal: faker.number.int({ min: 0, max: 5 }),
        estado: 1,
        fechainicio: faker.date.past().toISOString(),
        fechafin: faker.date.future().toISOString(),
        evaluaciones: [],
      }
      const newProyecto: ProyectoEntity = await service.crearProyecto(proyecto);
      const updatedProyecto = await service.avanzarProyecto(newProyecto.id);
      expect(updatedProyecto.estado).toEqual(2);
    });

    it('no se puede avanzar proyecto', async () => {
      const proyecto: ProyectoEntity ={
        id: 1 as any,
        titulo: faker.lorem.sentence(15),
        area: faker.lorem.word(),
        presupuesto: faker.number.int({ min: 1000, max: 10000 }),
        notafinal: faker.number.int({ min: 0, max: 5 }),
        estado: 4,
        fechainicio: faker.date.past().toISOString(),
        fechafin: faker.date.future().toISOString(),
        evaluaciones: [],
      }
      const newProyecto: ProyectoEntity = await service.crearProyecto(proyecto);
      try {
        await service.avanzarProyecto(newProyecto.id);
      } catch (e) {
        expect(e.message).toEqual('El proyecto ya está en su máximo estado');
      }
    });

    it('encontrar estudiantes', async () => {
      const proyecto: ProyectoEntity ={
        id: 1 as any,
        titulo: faker.lorem.sentence(15),
        area: faker.lorem.word(),
        presupuesto: faker.number.int({ min: 1000, max: 10000 }),
        notafinal: faker.number.int({ min: 0, max: 5 }),
        estado: 1,
        fechainicio: faker.date.past().toISOString(),
        fechafin: faker.date.future().toISOString(),
        evaluaciones: [],
      }
      const newProyecto: ProyectoEntity = await service.crearProyecto(proyecto);
      const estudiantes = await service.findAllEstudiantes(newProyecto.id);
      expect(estudiantes).not.toBeNull();
    });

    it('no se puede encontrar estudiantes', async () => {
      const proyecto: ProyectoEntity ={
        id: 1 as any,
        titulo: faker.lorem.sentence(15),
        area: faker.lorem.word(),
        presupuesto: faker.number.int({ min: 1000, max: 10000 }),
        notafinal: faker.number.int({ min: 0, max: 5 }),
        estado: 1,
        fechainicio: faker.date.past().toISOString(),
        fechafin: faker.date.future().toISOString(),
        evaluaciones: [],
      }
      try{const estudiantes = await service.findAllEstudiantes(1 as any);}
      catch (e) {
        expect(e.message).toEqual('Proyecto no encontrado');
      }
    });

});
