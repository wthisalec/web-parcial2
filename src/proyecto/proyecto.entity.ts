import { Column, Entity, Long, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';

@Entity()
export class ProyectoEntity {
    @PrimaryGeneratedColumn()
    id: Long;

    @Column()
    titulo: string;

    @Column()
    area: string;

    @Column("int")
    presupuesto: number;

    @Column("int")
    notafinal: number;

    @Column("int")
    estado: number;

    @Column()
    fechainicio: string;

    @Column()
    fechafin: string;

    @ManyToOne(() => EstudianteEntity, estudiante => estudiante.proyectos)
    lider: EstudianteEntity;

    @ManyToOne(() => ProfesorEntity, profesor => profesor.mentorias)
    mentor: ProfesorEntity;

    @OneToMany(() => EvaluacionEntity, proyecto => proyecto.proyecto)
    evaluaciones: EvaluacionEntity[];
}