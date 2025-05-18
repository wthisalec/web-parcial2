import { InjectRepository } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';

export class ProyectoService {
    constructor(
                @InjectRepository(ProyectoEntity)
                private readonly proyectoRepository: Repository<ProyectoEntity>, 
            ) {}
    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        if (!proyecto.titulo || proyecto.titulo.length <= 15) {
            throw new Error('El título debe tener más de 15 caracteres');
        }
        if (typeof proyecto.presupuesto !== 'number' || proyecto.presupuesto <= 0){
            throw new Error('El presupuesto debe ser mayor que 0');
        }
        else{
            return await this.proyectoRepository.save(proyecto);
        }
    }

    async avanzarProyecto(id: Long): Promise<ProyectoEntity> {
        const proyecto = await this.proyectoRepository.findOne({ where: { id } });
        if (!proyecto) {
            throw new Error('Proyecto no encontrado');
        }
        if (proyecto.estado >= 4) {
            throw new Error('El proyecto ya está en su máximo estado');
        }
        else{
            proyecto.estado += 1;
            return await this.proyectoRepository.save(proyecto);
        }
    }

    async findAllEstudiantes(id: Long): Promise<any> {
        const proyecto = await this.proyectoRepository.findOne({ where: { id }});
        if (!proyecto) {
            throw new Error('Proyecto no encontrado');
        }
        return proyecto.lider;
    }

}