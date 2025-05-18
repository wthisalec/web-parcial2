import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProyectoDto {

    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsString()
    @IsNotEmpty()
    readonly area: string;

    @IsNumber()
    @IsNotEmpty()
    readonly presupuesto: number;

    @IsNumber()
    @IsNotEmpty()
    readonly notafinal: number;

    @IsNumber()
    @IsNotEmpty()
    readonly estado: number;

    @IsString()
    @IsNotEmpty()
    readonly fechainicio: string;

    @IsString()
    @IsNotEmpty()
    readonly fechafin: string;

}
