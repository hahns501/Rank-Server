import mongoose from 'mongoose';

const activeUserSchema = mongoose.Schema({
    employeeID: String,
    name: String,
    userType: String,
    manager: Boolean,
    sessionKey: String,
    createdOn: {
        type: Date,
        default: new Date()
    },
})

const ActiveUsers = mongoose.model('ActiveUsers', activeUserSchema);

export default ActiveUsers
