import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
import { EvaluacionModule } from 'src/evaluacion/evaluacion.module';
import { ProfesorController } from './profesor.controller';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity, EvaluacionEntity]), EvaluacionModule],
  providers: [ProfesorService],
  controllers: [ProfesorController]
})
export class ProfesorModule {}
