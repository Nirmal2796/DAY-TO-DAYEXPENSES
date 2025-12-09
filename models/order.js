const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    paymentid: {
        type:String
    },
    orderid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',// References the User model (for relationships)
        required: true
    }
});



module.exports=mongoose.model('Order',orderSchema);



// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const Order=sequelize.define('order',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     paymentid:{
//         type:Sequelize.STRING
//     },
//     orderid:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     status:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// });

// module.exports=Order