import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/UserServices";

class UsersController {
    private userServices: UserServices
    constructor(){
        this.userServices = new UserServices()
    }
    index(){
        //buscar todos
    }
    async show(req: Request, res: Response, next: NextFunction){
        const {user_id} = req

        try {
            const response = await this.userServices.getByUserId(user_id)
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
    async store(req: Request, res: Response, next: NextFunction){
        const { name, password, email } = req.body
       try {
        const response = await this.userServices.create({ name, email, password })
        return res.status(201).json(response)

       } catch (error) {
        next(error)
       }
    }
    async auth(req: Request, res: Response, next: NextFunction){
       const {email, password} = req.body
       
       try {
        const response = await this.userServices.auth({ email, password })
        res.status(201).json(response)
       } catch (error) {
        next(error)
       }

    }
    async recover(req: Request, res: Response, next: NextFunction){
        const { email, newPassword} = req.body
        try {
            const response = await this.userServices.recover({ email, newPassword })
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction){
        const { email, password, name} = req.body
        const {user_id} = req
        const id = user_id
        try {
            const response = await this.userServices.update({ email, password, name, id })
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
}

export {UsersController}

