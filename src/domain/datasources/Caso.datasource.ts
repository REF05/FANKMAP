import { CasoModel } from "../../data/models/caso.model";
import { ICasoDocument } from "../entities/Caso.entitie";

export class CasoDataSource {
    public actualizarCaso = async (id: string, caso: Partial<ICasoDocument>) => {
        await CasoModel.findByIdAndUpdate(id, {
            lat: caso.lat,
            lng: caso.lng,
            isSent: caso.isSent,
            genre: caso.genre,
            age: caso.age,
            creationDate: caso.creationDate
        })
    }
}