import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from 'src/estudiante.entity/estudiante.entity';
import { Long, Repository } from 'typeorm';


export class EstudianteService {

    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,    
    ) {}
    
    async create(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        return this.estudianteRepository.save(estudiante);
    }

    async delete(id: Long){
        const estudiante = await this.estudianteRepository.findOne({ where: { id } });
        if (!estudiante) {
            throw new Error('Estudiante no encontrado');
        } else if (!estudiante.proyectos || estudiante.proyectos.length === 0) {
            await this.estudianteRepository.remove(estudiante);
        } else {
            throw new Error('El estudiante tiene proyectos asociados y no se puede eliminar.');
        }}
        
}
