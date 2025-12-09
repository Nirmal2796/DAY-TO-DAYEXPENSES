const mongoose=require('mongoose');

const Schema=mongoose.Schema;

// Creating schema (structure/fields of documents in collection)
const userSchema=new Schema({ 
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ispremiumuser:{
        type:Boolean,
        required:true
    },
    totalExpenses:{
        type:Number,
        default:0
    }
});


module.exports=mongoose.model('User',userSchema); //Create model 



// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const User=sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         unique:true
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
    
//     ispremiumuser:Sequelize.BOOLEAN,
//     totalExpenses:{
//         type:Sequelize.INTEGER,
//         defaultValue:0
//     }
// });

// module.exports=User;