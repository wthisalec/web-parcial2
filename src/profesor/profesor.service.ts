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
            throw new Error('La extensión debe tener exactamente 5 dígitos');
        } else{
                return this.profesorRepository.save(profesor);
            }}

    async asignarEvaluador(profesorId: Long, evaluacionId: Long): Promise<ProfesorEntity> {
        const profesor = await this.profesorRepository.findOne({ where: { id: profesorId } });

        if (!profesor) {
            throw new Error('Profesor no encontrado');
        }

        const cantidadEvaluaciones = profesor.evaluaciones.length;

        if (cantidadEvaluaciones >= 3) {
            throw new Error('Este profesor ya tiene 3 o más evaluaciones');
        }

        const evaluacion = await this.evaluacionRepository.findOne({ where: { id: evaluacionId } });
        if (evaluacion) {
            profesor.evaluaciones.push({ evaluacion } as any);
        }
        else{
            throw new Error('Evaluación no encontrada');
        }

        return this.profesorRepository.save(profesor);
}  
}
