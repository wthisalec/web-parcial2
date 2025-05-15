import { InjectRepository } from '@nestjs/typeorm';
import { EvaluacionEntity } from 'src/evaluacion.entity/evaluacion.entity';
import { Repository } from 'typeorm';

export class EvaluacionService {

    constructor(
            @InjectRepository(EvaluacionEntity)
            private readonly evaluacionRepository: Repository<EvaluacionEntity>,    
        ) {}

    async create(evaluacion: EvaluacionEntity): Promise<EvaluacionEntity> {
            return this.evaluacionRepository.save(evaluacion);
        }
}
