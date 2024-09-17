import {Request, Response} from 'express';
import {CasoModel } from '../../data/models/caso.model';

export class CasoController{
    public obtenerCasos = async (req: Request, res:Response)=>{
        try {
            const casos = await CasoModel.find();
            res.json(casos);
        } catch (error) {
    
        }
    }
    public registrarCaso = async (req:Request, res:Response)=>{
        try {
            const {lat, lng, isSent, genre, age} = req.body;
            const fechaRegistro = new Date();
            const nuevoCaso = await CasoModel.create({
                lat, lng, isSent, genre, age, fechaRegistro});
            return res.json(nuevoCaso);
        }
        catch (error) {
    
        }
    }

    public actualizarCaso = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const {lat, lng, isSent, genre, age, creationDate} = req.body;
        try{
            const caso = await CasoModel.findByIdAndUpdate(id,{
                lat, lng, isSent, genre, age, creationDate
            });
            res.json();
        }catch(error){
            console.error(error);
        }
    }
    public borrarCaso = async (req:Request, res:Response)=>{
        const {id} = req.params;
        try{
            const caso = await CasoModel.findByIdAndDelete(id);
            res.json(caso);
        }catch(error){
            console.error(error);
        }
    }
    public obtenerPorUltimaSemana = async (req:Request, res:Response)=>{
        try {
            const semanaAtras = new Date();
            semanaAtras.setDate(semanaAtras.getDate() - 7);
    
            const casos = await CasoModel.find({
                creationDate: { $gte: semanaAtras }
            });
    
            res.json(casos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}