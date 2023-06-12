import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

class AuthMiddleware {
    auth(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({
                code: "token.missing",
                message: "token missing"
            }) 
        }
        const [ , token] = authHeader.split(' ')
        const apiKey: string | undefined = process.env.ACCESS_TOKEN_JWT

        if (!apiKey){
            throw new Error('token is missing')
            
        }
        try {
            const { sub } = verify(token, apiKey) as IPayload
            req.user_id = sub
            return next()
        } catch (error) {
            return res.status(401).json({
                code: "token.expired",
                message: "token expired"
            })
        }
    }
}

export {AuthMiddleware}