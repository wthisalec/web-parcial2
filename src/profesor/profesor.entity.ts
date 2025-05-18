import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';

@Entity()
export class ProfesorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: Long;

    @Column("int")
    cedula: number;

    @Column()
    nombre: string;
    
    @Column()
    departamento: string;

    @Column("int")
    extension: number;

    @Column()
    esParEvaluador: boolean;

    @OneToMany(() => ProyectoEntity, proyecto => proyecto.mentor)
    mentorias: ProyectoEntity[];

    @OneToMany(() => EvaluacionEntity, proyecto => proyecto.evaluador)
    evaluaciones: EvaluacionEntity[];
}
