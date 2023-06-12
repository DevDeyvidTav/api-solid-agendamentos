import { isBefore, startOfHour } from "date-fns";
import { IScheduleCreate, IScheduleUpdate } from "../interfaces/ScheduleInterfaces";
import { SchedulesRepository } from "../repositories/SchedulesRepository";

class SchedulesService {
    private schedulesRepository: SchedulesRepository
    constructor(){
        this.schedulesRepository = new SchedulesRepository()
    }
    async getSchedulesByUser(user_id: string){
        const checkIfHasSchedules =  await this.schedulesRepository.findByUserId(user_id)
        if (checkIfHasSchedules === undefined){
            throw new Error('Schedules not found')
        }
        return checkIfHasSchedules
    }



    async create ({name, phone, date, user_id}: IScheduleCreate){
        const dateFormatted = new Date(date)

        const hourStart = startOfHour(dateFormatted)

        if(isBefore(hourStart, new Date())){
            throw new Error ("it is not allowed to schedule old date!")
        }
        const checkIsAvaliable = await this.schedulesRepository.find(hourStart)
        if(checkIsAvaliable) {
            throw new Error ('Schedule date is not available')
        }

        const response = await this.schedulesRepository.create({name, phone, date: hourStart, user_id})
        return response
    }
    async index(date: Date){
        const response = await this.schedulesRepository.findAll(date)
        if(response.length === 0){
            throw new Error ('Schedules not found')
        }
        return response
    }
    async update({id, name, date, phone}: IScheduleUpdate ){
        const response = await this.schedulesRepository.update({id, name, date, phone})
        return response 
    }
    async delete (id: string){
        const response = await this.schedulesRepository.delete(id)
        return response 
    }
}
export {SchedulesService}