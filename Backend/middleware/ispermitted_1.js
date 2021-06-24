const { next } = require('locutus/php/array')
const USERS = require('../models/user')
const jwt  =require('jsonwebtoken')
const config = require('../config/config')
const secret = require('../config/secret')

const isPermitted = (permission)=>{
    
    return (req,res,next)=>{
        
        console.log('cookies',req.cookies)
   
        const token = req.cookies.token

        if(!token){
            console.log('No Token Found')
            return res.status(401).send({
                error:'You must be logged in.'
            });
             
        }
        jwt.verify(token,secret.secret,async(err,payload)=>{

            if(permission.includes(payload.user_role)){
                next()
            }

           else if(err){
            console.log('Not Allowed')

                return res.status(401).send({error:'You must be logged in.'});
            }
            else{
                console.log('Not Allowed')


                return res.status(401).send({error:'You must be logged in.'});  
            }
            
        })  


        
    }
}

module.exports = isPermitted