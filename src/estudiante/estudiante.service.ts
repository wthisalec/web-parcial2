import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';

@Injectable()
export class EstudianteService {

    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,    
    ) {}
    
    async create(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if (estudiante.promedio <= 3.2 || estudiante.semestre < 4) {
            throw new BadRequestException('El promedio debe ser mayor a 3.2 y el semestre igual o mayor a 4');
        }
        return this.estudianteRepository.save(estudiante);
    }

    async delete(id: Long){
        const estudiante = await this.estudianteRepository.findOne({ where: { id } });
        if (!estudiante) {
            throw new BadRequestException('Estudiante no encontrado');
        } else if (!estudiante.proyectos || estudiante.proyectos.length === 0) {
            await this.estudianteRepository.remove(estudiante);
        } else {
            throw new BadRequestException('El estudiante tiene proyectos asociados y no se puede eliminar.');
        }}
        
}
