import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fName: String,
    lName: String,
    employeeID: String,
    password: String,
    userType: String,
    manager: Boolean,
    active: {
        type: Boolean,
        default: false,
        required: true,
    },
    cashierReport:{
        type: String,
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
})

const User = mongoose.model('User', userSchema)

export default User
