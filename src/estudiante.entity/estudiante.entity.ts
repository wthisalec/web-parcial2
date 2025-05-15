import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProyectoEntity } from '../proyecto.entity/proyecto.entity';


@Entity()
export class EstudianteEntity {

@PrimaryGeneratedColumn('uuid')
id: Long;

@Column()
nombre: string;

@Column("int")
cedula: number;

@Column("int")
semestre: string;

@Column()
programa: string;

@Column("int")
promedio: number;

@OneToMany(() => ProyectoEntity, proyecto => proyecto.lider)
proyectos: ProyectoEntity[];

}
