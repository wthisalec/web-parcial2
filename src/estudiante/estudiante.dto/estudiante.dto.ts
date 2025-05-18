import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EstudianteDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNumber()
    @IsNotEmpty()
    readonly cedula: number;

    @IsNumber()
    @IsNotEmpty()
    readonly semestre: number;

    @IsString()
    @IsNotEmpty()
    readonly programa: string;

    @IsNumber()
    @IsNotEmpty()
    readonly promedio: number;
}
