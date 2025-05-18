import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { ProfesorEntity } from './profesor.entity';

export class ProfesorService {
    constructor(
                @InjectRepository(ProfesorEntity)
                private readonly profesorRepository: Repository<ProfesorEntity>,

                @InjectRepository(EvaluacionEntity)
                private readonly evaluacionRepository: Repository<EvaluacionEntity>,    
            ) {}
    
    async create(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        if (profesor.extension.toString().length !== 5) {
            throw new BadRequestException('La extensión debe tener exactamente 5 dígitos');
        } else{
                return this.profesorRepository.save(profesor);
            }}

    async asignarEvaluador(profesorId: Long, evaluacionId: Long): Promise<ProfesorEntity> {
        const profesor = await this.profesorRepository.findOne({ where: { id: profesorId } });

        if (!profesor) {
            throw new BadRequestException('Profesor no encontrado');
        }

        if (!profesor.evaluaciones){
            profesor.evaluaciones = [];
        }


        if (profesor.evaluaciones?.length?? 0 >= 3) {
            throw new BadRequestException('Este profesor ya tiene 3 o más evaluaciones');
        }

        const evaluacion = await this.evaluacionRepository.findOne({ where: { id: evaluacionId } });
        if (evaluacion) {
            profesor.evaluaciones.push(evaluacion as any);
        }
        else{
            throw new BadRequestException('Evaluación no encontrada');
        }

        return this.profesorRepository.save(profesor);
}  
}
