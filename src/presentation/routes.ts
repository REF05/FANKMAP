import {Router} from 'express';
import { CasoRoutes } from './casos/routes';

export class AppRoutes {
    static get routes() : Router{
        const router = Router();
        router.use("/api/casos",CasoRoutes.routes)
        return router
    }
}