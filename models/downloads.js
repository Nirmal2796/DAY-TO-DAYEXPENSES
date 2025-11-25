const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const downloadSchema=new Schema({
        date:{
        type:Date,
        required: true
    },
    fileURL:{
        type:String,
        required: true
    },
     userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports=mongoose.model("Download",downloadSchema);


// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const Downloads=sequelize.define('download',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         primaryKey:true,
//         autoIncrement:true
//     },
//     date:{
//         type:Sequelize.DATEONLY,
//         allowNull:false
//     },
//     fileURL:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// });


// module.exports=Downloads;