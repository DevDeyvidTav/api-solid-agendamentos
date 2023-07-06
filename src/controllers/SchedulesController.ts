import { parseISO } from "date-fns";
import { SchedulesService } from "../services/SchedulesService";
import { NextFunction, Request, Response } from "express";

class SchedulesController {
    private schedulesService: SchedulesService;
    constructor() {
        this.schedulesService = new SchedulesService()
    }

    async store(req: Request, res: Response, next: NextFunction){
       
        const {name, phone, date} = req.body
        const {user_id} = req
       try {
        const response = await this.schedulesService.create({name, phone, date, user_id})
        res.status(201).json(response)
       } catch (error) {
            next(error)
       }
       
    }
    async index (req: Request, res: Response, next: NextFunction){
        const {date} = req.query
        const parseDate = date? parseISO(date.toString()): new Date()
        try {
            const response = await this.schedulesService.index(parseDate)
            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async getSchedulesByUser(req: Request, res: Response, next: NextFunction) {
        const { user_id } = req;
        const { date } = req.query;
      
        const day = date ? new Date(date as string) : new Date();
        
      
        try {
          const response = await this.schedulesService.getSchedulesByUser(user_id, day);
          return res.status(201).json(response);
        } catch (error) {
          next(error);
        }
      }
    async update(req: Request, res: Response, next: NextFunction){
        const {id, phone, name, date} = req.body

        try {
            const response = await this.schedulesService.update({id, phone, name, date})
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction){
        const {id} = req.query

        try {
            const response = await this.schedulesService.delete(String(id))
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
}
export {SchedulesController}