import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionController } from './evaluacion.controller';
import { EvaluacionEntity } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluacionEntity])],
  providers: [EvaluacionService],
  controllers: [EvaluacionController]
})
export class EvaluacionModule {}
