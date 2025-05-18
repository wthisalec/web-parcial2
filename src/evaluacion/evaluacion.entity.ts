import { Entity, Long, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';

@Entity()
export class EvaluacionEntity {
    @PrimaryGeneratedColumn()
    id: Long;

    @ManyToOne(() => ProyectoEntity, proyecto => proyecto.evaluaciones)
    proyecto: ProyectoEntity;

    @ManyToOne(() => ProfesorEntity, profesor => profesor.evaluaciones)
    evaluador: ProfesorEntity;

}