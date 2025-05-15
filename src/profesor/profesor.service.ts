import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from 'src/profesor.entity/profesor.entity';
import { Repository } from 'typeorm';

export class ProfesorService {
    constructor(
                @InjectRepository(ProfesorEntity)
                private readonly profesorRepository: Repository<ProfesorEntity>,    
            ) {}
    
    async create(profesor: ProfesorEntity): Promise<ProfesorEntity> {
                return this.profesorRepository.save(profesor);
            }

    
}
