import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluacionEntity } from './evaluacion.entity';

export class EvaluacionService {

    constructor(
            @InjectRepository(EvaluacionEntity)
            private readonly evaluacionRepository: Repository<EvaluacionEntity>,    
        ) {}

    async create(evaluacion: EvaluacionEntity): Promise<EvaluacionEntity> {
        if (evaluacion.proyecto!.mentor === evaluacion.evaluador) {
            throw new Error('El proyecto no puede ser evaluado por su mentor');}
        if (evaluacion.proyecto!.notafinal < 0 || evaluacion.proyecto!.notafinal > 5) {
            throw new Error('La nota final del proyecto debe ser mayor a 0 y menor a 5');}
        else{
            return this.evaluacionRepository.save(evaluacion);
        }}
}
