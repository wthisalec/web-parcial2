import { Entity, Long, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfesorEntity } from '../profesor.entity/profesor.entity';
import { ProyectoEntity } from '../proyecto.entity/proyecto.entity';

@Entity()
export class EvaluacionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: Long;

    @ManyToOne(() => ProyectoEntity, proyecto => proyecto.evaluaciones)
    proyecto: ProyectoEntity;

    @ManyToOne(() => ProfesorEntity, profesor => profesor.evaluaciones)
    profesor: ProfesorEntity;

}