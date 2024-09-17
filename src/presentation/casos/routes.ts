import {Router} from 'express';
import { CasoController } from './controller';

export class CasoRoutes{

    static get routes(): Router{
        const router = Router();
        const casoController = new CasoController();
        router.get("/", casoController.obtenerCasos);
        router.post("/", casoController.registrarCaso);
        router.get("/ultimasemana", casoController.obtenerPorUltimaSemana);
        router.put("/:id", casoController.actualizarCaso);
        router.delete("/:id", casoController.borrarCaso);
        return router;
    }
}