import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class FirstNestMiddleware implements NestMiddleware {

use(req: Request, res: Response, next: NextFunction){


console.log(req.params.id + " middle");
console.log(req.params.cid + " middle");

next()

}

}


export class SecondNestMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction){
    
    
    console.log("2ndMiddle");
    
    
    next()
    
    }
    
    }