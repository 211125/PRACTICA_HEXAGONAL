import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import 'reflect-metadata';


export class ValidatorCreateTaske {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public title: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public descripcion: string;


    @Transform((value: TransformFnParams) => value.value ? new Date(value.value) : null, { toClassOnly: true })
    public dalite_date: Date | null;

    constructor(
        uuid: string,
        title: string,
        descripcion: string,
    
        dalite_date: Date | null
    ) {
        this.uuid = uuid;
        this.title = title;
        this.descripcion = descripcion;
        this.dalite_date = dalite_date;
    }
}


export class ValidatorId {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
    constructor(uuid:string) {
        this.uuid = uuid
    }
}

export class ValidatorUpdate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public title?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public descripcion?: string;


 
    constructor( 
        uuid: string,
        title?: string,
        descripcion?: string,
       ) {
            
        this.uuid = uuid;
        this.title = title;
        this.descripcion = descripcion;
        
    }
}

export class ValidatorupdatePassword {

    @IsNotEmpty()
    @IsEmail()
    public title: string;

    @IsNotEmpty()
    @IsString()
    public descripcion: string;

    constructor(
        title: string,
        descripcion: string
    ) {
        this.title = title;
        this.descripcion = descripcion;
    }

}