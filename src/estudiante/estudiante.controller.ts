import { Body, Controller, Delete, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { Long } from 'typeorm';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';

@Controller('estudiante')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {

    constructor(private readonly estudianteService: EstudianteService) {}

    @Post()
    async create(@Body() estudianteDto: EstudianteDto){
        const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto)
        return await this.estudianteService.create(estudiante);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: Long){
        return await this.estudianteService.delete(id);
    }
}
