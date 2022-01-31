import UserMessage from "../models/userMessage.js";
import ActiveUsers from "../models/activeUsers.js";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connection from './db.js';

export const getUsers = async (req, res) => {
    console.log("Get all users")

    try{
        const userMessage = await UserMessage.find();

        res.status(200).json(userMessage);
    } catch (error){
        res.status(404).json({message: error.message});
    }
}

export const findUser = async (req,res) => {
    const user = req.body;
    console.log("Find a user")
    console.log(user)

    try{
        const userMessage = await UserMessage.findOne(user);

        console.log(userMessage)

        res.status(200).json(userMessage);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const loginUser = async (req,res) => {
    const user = req.body;

    console.log("Login User");

    // let query = `SELECT EXISTS(SELECT * from user WHERE username=${user.username} and password=${user.password})`
    let query = `SELECT EXISTS(SELECT * from user WHERE username='${user.username}') as truth`;

    try{
        // const existingUser = await UserMessage.findOne(user);
        // let existingUserObj = existingUser.toObject();
        //
        //
        // if (existingUser === null){
        //     console.log("Not found");
        // }else{
        //     await UserMessage.findByIdAndUpdate(existingUser._id, {active: true});
        //
        //     // Generate token for each user session
        //     const token = jwt.sign({ id: existingUser._id,employeeID: existingUser.employeeID}, 'key', {expiresIn: '1hr'});
        //
        //     // Create a new document in active users
        //     let fullName = (`${existingUser.fName} ${existingUser.lName}`);
        //
        //     const activeUser = new ActiveUsers({
        //         _id: existingUser._id,
        //         employeeID: existingUser.employeeID,
        //         name: fullName,
        //         userType: existingUser.userType,
        //         manager: existingUserObj.manager,
        //         sessionKey: token,
        //     });
        //
        //     console.log(activeUser);
        //
        //     try{
        //         await activeUser.save();
        //         res.status(200).json({result: activeUser, token});
        //     }catch(error){
        //         res.status(200).json({result: activeUser, token});
        //         console.log(error.message)
        //     }
        // }
        // console.log(user.username)
        // console.log(user.password)

        connection.query(query, function (err,results, fields) {
            if (err){
                console.log(err)
            }

            let result = results[0].truth

            if (result === 1){
                res.status(200).json({login : true})
            }else{
                res.status(200).json({login : false})
            }
        })

    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const deleteUser = async (req,res) =>{
    const {id} = req.params;
    console.log("Delete User");

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No user with that id");

    await UserMessage.findByIdAndDelete(id);

    res.json({ message: 'User deleted'});
}

export const createUser = async (req, res) => {
    const user = req.body;
    console.log("Create User");
    console.log(user);
    console.log(user.email);

    // let query = `insert into user (email, password, first_name, last_name, occupation, years_experience, role) values ("${user.email}", '${user.password}','${user.fName}','${user.lName}','${user.occupation}', ${user.yearsExp}, '${user.role}')`;
    let query = 'insert into user (email, password, first_name, last_name, occupation, years_experience, role) values (?, ?, ?, ?, ?, ?, ?)';
    // let query = 'select * from user'
    try{
        connection.query(query, [user.email, user.password, user.fName, user.lName, user.occupation, user.yearsExp, user.role], function (err,results, fields) {
            if (err){
                console.log(err);
            }

            console.log(results);
        })
    }catch(error){
        res.status(404).json({message: error.message});
    }
    // const User = new UserMessage(user);

    // try{
    //     await User.save();
    //
    //     res.status(201).json(User);
    // } catch(error) {
    //     res.status(409).json({message: error.message});
    // }
}

export const logoutUser = async (req, res) =>{
    const user = req.body;
    let userFound;

    console.log("Logging Out User")
    console.log(user);
    // const logUser = new ActiveUsers(user);

    // delete user from activeUser collection
    try{
        userFound = await ActiveUsers.findOneAndDelete({sessionKey: user.sessionKey});
        console.log(userFound);
    }catch(error){
        console.log("User Not Found");
        res.status(404).json({message: error.message});
    }
    //userFound could be null

    console.log("Changing status to inactive")
    // change active status of user to false
    try{
        await UserMessage.findByIdAndUpdate(userFound._id, {active: false});
    }catch(error){
        console.log(error.message)
        res.status(404).json({message: error.message});
    }

    res.json({ message: 'User Logged Out'});
}

export const updateUser = async (req,res) =>{
    const {id: _id} = req.params;
    const userBody = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id');

    const updateUser = await UserMessage.findByIdAndUpdate(_id, userBody, {new:true});

    res.json(updateUser);
}