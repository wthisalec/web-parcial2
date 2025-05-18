import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { EvaluacionDto } from './evaluacion.dto/evaluacion.dto';
import { EvaluacionEntity } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';

@Controller('evaluaciones')
@UseInterceptors(BusinessErrorsInterceptor)
export class EvaluacionController {

    constructor(private readonly evaluacionService: EvaluacionService) {}

    @Post()
    async create(@Body() evaluacionDto: EvaluacionDto){
        const evaluacion: EvaluacionEntity = plainToInstance(EvaluacionEntity, evaluacionDto)
        return await this.evaluacionService.create(evaluacion);
    }
}
