const path=require('path');
const fs=require('fs');

const express = require('express');

const cors=require('cors');
const helemt=require('helmet');
const morgan=require('morgan');

require('dotenv').config(); 

const app=express();

const bodyParser=require('body-parser');

// const sequelize=require('./util/database');

const mongoose=require('mongoose');

const User=require('./models/user');
const Expense=require('./models/expense');
const Order=require('./models/order');
const ForgotPasswordRequests=require('./models/forgotPasswordRequests');
const Downloads=require('./models/downloads');

const userRouter=require('./routes/user');
const expenseRouter=require('./routes/expense');
const purchaseRouter=require('./routes/purchase');
const reportsRouter=require('./routes/reports');
const downloadsRouter=require('./routes/downloads');
const leaderboardRouter=require('./routes/leaderboard');
const passwordRouter=require('./routes/password');

const accessLogStream=fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'})

app.use(helemt({ contentSecurityPolicy: false }));
app.use(morgan('combined',{stream:accessLogStream}));


app.use(cors());

//express.static() is a function that takes a path, and returns a middleware that serves all files in that path.
app.use(express.static(path.join(__dirname, 'public')));

//option {extended:false} configures the middleware to use the classic encoding algorithm
app.use(bodyParser.json({extended:false}));

app.use(bodyParser.urlencoded({extended:true}));

app.use(userRouter);
app.use(expenseRouter);
// app.use(purchaseRouter);
// app.use(reportsRouter);
// app.use(downloadsRouter);
// app.use(leaderboardRouter);
app.use(passwordRouter);

// app.use((req,res) => {
    // console.log("URL>>>",req.url);
    // res.sendFile(path.join(__dirname, `public/${req.url}`));
// });

// User.hasMany(Expense); //one to many
// Expense.belongsTo(User); //one to one

// User.hasMany(Order);
// Order.belongsTo(User);

// User.hasMany(ForgotPasswordRequests);
// ForgotPasswordRequests.belongsTo(User);

// User.hasMany(Downloads);
// Downloads.belongsTo(User);

// sequelize
// .sync()
// // .sync({force:true})
// .then(result=>{
//     app.listen(3000);
// })
// .catch(err=>console.log(err));

mongoose.connect('mongodb+srv://nirmal:6X4PCGjNhLBr1qzj@cluster0.qyfqoli.mongodb.net/dtdexpense?appName=Cluster0')
.then((result)=>{
    // console.log(result);
  app.listen(3000);
})
.catch(err=>{
  console.log(err);
})

