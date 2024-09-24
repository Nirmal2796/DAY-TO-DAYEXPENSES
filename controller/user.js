const bcrypt = require('bcrypt');


const User = require('../models/user');
const JWTServices=require('../services/JWTservices');
const sequelize = require('../util/database');


const postSignupUser = async (req, res) => {

    const t=await sequelize.transaction();

    try {

        email = req.body.email;
        uname = req.body.name;
        password = req.body.password;


        const user = await User.findAll({where:{email:email}})

        
        if (user.length>0) {
            res.status(403).json('User Already Exists');
        }
        else {

            bcrypt.hash(password, 10, async (err, hash) => {

                if (!err) {
                    const newUser = await User.create({
                        email: email,
                        name: uname,
                        password: hash
                    },{transaction:t});

                    await t.commit();

                    res.status(201).json({ newUser: newUser, message: 'User registered Successfully...Please Log In' });
                }
                else {
                    throw new Error('Something went wrong');
                }
            })
        }
    }
    catch (err) {
        await t.rollback();
        res.status(500).json({ success: false, message: err });
    }

}


const postLoginUser = async (req, res) => {

    try{
        const email = req.body.email;
        const password = req.body.password;
    
        const user = await User.findAll({where:{email}});
    
        if (user.length>0) {

            
            bcrypt.compare(password,user[0].password,(err,result)=>{

                if(err){
                    throw new Error('Something Went Wrong');
                }
                if(result){
                    res.status(200).json({ message: 'User logged in Successfully' , token: JWTServices.generateToken(user[0].id , user[0].ispremiumuser) });
                }
                else{
                    res.status(401).json({ message: ' User not authorized' });
                }
            })
           
        }
        else {
            res.status(404).json({ message: 'User not found'});
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err });
    }

};


const getLogoutUser=async(req,res)=>{
    // console.log('in logout');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.redirect('/');
}


module.exports={postLoginUser,postSignupUser,getLogoutUser};