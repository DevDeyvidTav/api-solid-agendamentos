import { prisma } from "../database/prisma";
import { Icreate, Irecover, Iupdate } from "../interfaces/UserInterfaces";



class UsersRepository {
    async findByEmail(email: string){
        const response = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        return response
    }
    async create({email, password, name}: Icreate){
         const response = await prisma.users.create({
            data: {
                name,
                email,
                password
            }
        })
        return response
    }
    async recover({email, newPassword}: Irecover){
        const response = await prisma.users.update({
            where: {
                email: email,
            },
            data:{
                password: newPassword,
            }
        })
        return response
    }
    async getByUserId(id: string){
        const response = await prisma.users.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        return response
    }
    async update({name, email, password, id}: Iupdate){
        const response = await prisma.users.update({
            where: {
                id: id
            },
            data: {
                name,
                email,
                password
            }
        })
        return response
    }
}


export {UsersRepository} 