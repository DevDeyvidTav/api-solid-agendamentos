import {Router} from 'express'
import { SchedulesController } from '../controllers/SchedulesController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

class SchedulesRoutes{
    private authMiddleware : AuthMiddleware
    private router: Router;
    private schedulesController: SchedulesController;
    constructor() {
        this.authMiddleware = new AuthMiddleware()
        this.router = Router()
        this.schedulesController = new SchedulesController()
    }

    getRoutes(): Router {
        this.router.delete('/', this.authMiddleware.auth, this.schedulesController.delete.bind(this.schedulesController))
        this.router.put('/', this.authMiddleware.auth, this.schedulesController.update.bind(this.schedulesController))
        this.router.get('/user', this.authMiddleware.auth, this.schedulesController.getSchedulesByUser.bind(this.schedulesController))
        this.router.get('/', this.authMiddleware.auth, this.schedulesController.index.bind(this.schedulesController))
        this.router.post('/', this.authMiddleware.auth, this.schedulesController.store.bind(this.schedulesController))


        return this.router;
    }
}

export {SchedulesRoutes}