const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forgotPasswordSchema = new Schema({
    _id:{
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',// References the User model (for relationships)
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

module.exports=mongoose.model('ForgotPassword',forgotPasswordSchema);




// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// // const { v4: uuidv4 } = require('uuid');

// const ForgotPasswordRequests=sequelize.define('forgotpasswordrequest',{
//     id:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         primaryKey:true
//     },
//     userId:{
//         type:Sequelize.INTEGER,
//         allowNull:false
//     },
//     isActive:{
//         type:Sequelize.BOOLEAN,
//         allowNull:false
//     }
// });

// module.exports=ForgotPasswordRequests;