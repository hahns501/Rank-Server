import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try{
        const token = req.headers.Authorization.split(" ")[1];


    }catch(error){
        console.log(error);
    }
}