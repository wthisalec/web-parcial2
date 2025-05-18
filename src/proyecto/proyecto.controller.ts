import { Body, Controller, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { Long } from 'typeorm';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';

@Controller('proyecto')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {

    constructor(private readonly proyectoService: ProyectoService) {}

    @Post()
    async crearProyecto(@Body() proyectoDto: ProyectoDto) {
        const proyecto: ProyectoEntity = plainToInstance(ProyectoEntity, proyectoDto);
        return await this.proyectoService.crearProyecto(proyecto);
    }

    @Put('proyectoId')
    async avanzarProyecto(@Body('proyectoId') id: Long) {
        return await this.proyectoService.avanzarProyecto(id);
    }

    @Get('proyectoId')
    async findAllEstudiantes(@Body('proyectoId') id: Long) {
        return await this.proyectoService.findAllEstudiantes(id);
    }

}
