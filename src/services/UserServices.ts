import { compare, hash } from "bcrypt"
import { IAuth, Icreate, Irecover, Iupdate } from "../interfaces/UserInterfaces"
import { UsersRepository } from "../repositories/UserRepository"
import { sign } from "jsonwebtoken"

class UserServices{
    private usersRepository: UsersRepository
    constructor(){
        this.usersRepository = new UsersRepository()
    }
    async create({email, password, name}: Icreate){
        const hashPassword = await hash(password, 10)
        const findUser = await this.usersRepository.findByEmail(email)
        if(findUser){
            throw new Error('User already exists')
        }
        const response = await this.usersRepository.create({
            email,
            password: hashPassword,
            name
        })
        return response
    }
    async recover ({email, newPassword}: Irecover){
        const findUser = await this.usersRepository.findByEmail(email)
        if(!findUser){
            throw new Error('User dont exists')
        }

        const response = await this.usersRepository.recover({email, newPassword})
        return response
    }
    async auth ({ email, password } :IAuth){
        const findUser = await this.usersRepository.findByEmail(email)
        if(!findUser){
            throw new Error('User dont exists, please register')
        }
        const verifyPasswordMatch = await compare(password, findUser.password)
        if(!verifyPasswordMatch){
            throw new Error('Password is incorrect')
        }
        const apiKey: string | undefined = process.env.ACCESS_TOKEN_JWT
        if (!apiKey){
            throw new Error('token is missing')
        }

        const token = sign({email}, apiKey, {
            subject: findUser.id,
            expiresIn: 60 * 15
        })
        return  {
            name: findUser.name,
            email: findUser.email,
            token: token,
        }
    }
    async getByUserId(id: string){
        const response = await this.usersRepository.getByUserId(id)
        if (!response){
            throw new Error('User dont exists')
        }
        return response
    }
    async update({name, email, password, id}: Iupdate){
        const response = await this.usersRepository.update({name, email, password, id})
        return response
    }
}
export {UserServices}