import ActiveUsers from '../models/activeUsers.js'
import mongoose from 'mongoose';

export const getActiveUsers = async (req,res) =>{
    console.log("Active Users");
    try{
        const activeUsers = await ActiveUsers.find();

        res.status(200).json(activeUsers);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const deleteAllActiveUsers = async (req,res) =>{
    console.log("Delete All Active Users");

    await ActiveUsers.deleteMany({});

    res.json({message:"Deleted All Active Users"});
}

export const deleteActiveUser = async(req,res) => {
    console.log("Delete Active User");

    const {id} = req.params;
    console.log(id);

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No active user with that id");

    await ActiveUsers.findByIdAndRemove(id);

    res.json({message: "Active User Deleted"});
}