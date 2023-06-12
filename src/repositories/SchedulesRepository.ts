import { endOfDay, startOfDay } from "date-fns"
import { prisma } from "../database/prisma"
import { IScheduleCreate, IScheduleUpdate } from "../interfaces/ScheduleInterfaces"

class SchedulesRepository {
    async findAll(date: Date) {
        
        const response = await prisma.schedule.findMany({
            where: {
                date: {
                    gte: startOfDay(date),
                    lt: endOfDay(date)
                }
            },
            orderBy: {
                date: "asc"
            }
        })
        return response
    }
    async create({ name, date, phone, user_id }: IScheduleCreate) {
        const response = await prisma.schedule.create({
            data: {
                name,
                date,
                phone,
                userId: user_id
            },
        })
        return response

    }

    async find(date: Date) {
        const response = await prisma.schedule.findFirst({
            where: {
                date: date
            }
        })
        return response
    }
    async findByUserId(userId: string){
        const response = await prisma.schedule.findMany({
            where: {
                userId: userId
            }
        })
        return response
    }
    async update({id, name, date, phone}: IScheduleUpdate){
        const response = await prisma.schedule.update({
            where: {
                id: id
            },
            data: {
                date,
                name,
                phone
            }
        })
        return response
    }
    async delete (id: string){
        const response = await prisma.schedule.delete({
            where: {
                id: id
            }
        })
        return response
    }
}


export { SchedulesRepository } 