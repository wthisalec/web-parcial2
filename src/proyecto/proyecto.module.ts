import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoController } from './proyecto.controller';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity])],
  providers: [ProyectoService],
  controllers: [ProyectoController]
})
export class ProyectoModule {}
