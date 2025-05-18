import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { EstudianteModule } from './estudiante/estudiante.module';
import { EvaluacionEntity } from './evaluacion/evaluacion.entity';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { ProfesorEntity } from './profesor/profesor.entity';
import { ProfesorModule } from './profesor/profesor.module';
import { ProyectoEntity } from './proyecto/proyecto.entity';
import { ProyectoModule } from './proyecto/proyecto.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [EstudianteEntity, ProfesorEntity, EvaluacionEntity, ProyectoEntity],
      synchronize: true,
    }),
    EstudianteModule, ProfesorModule, EvaluacionModule, ProyectoModule
  ],
})
export class AppModule {}
