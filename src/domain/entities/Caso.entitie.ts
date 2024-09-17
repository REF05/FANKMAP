export interface ICaso{
    lat:number;
    lng:number;
    isSent:boolean;
    genre:string;
    age:number;
    creationDate:Date;
}

export interface ICasoDocument extends Document, ICaso {}