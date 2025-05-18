import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { Long } from 'typeorm';
import { ProfesorDto } from './profesor.dto/profesor.dto';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';

@Controller('profesor')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {

    constructor(private readonly profesorService: ProfesorService) {}

    @Post()
    async create(@Body() profesorDto: ProfesorDto){
        const profesor: ProfesorEntity = plainToInstance(ProfesorEntity, profesorDto)
        return await this.profesorService.create(profesor);
    }

    @Patch(':profesorId/asignar-evaluador/:evaluacionId')
  async asignarEvaluador(
    @Param('profesorId', ParseIntPipe) profesorId: Long,
    @Param('evaluacionId', ParseIntPipe) evaluacionId: Long,
  ) {
    return await this.profesorService.asignarEvaluador(profesorId, evaluacionId);
  }
}
